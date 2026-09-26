const fs = require('fs');
const request = require('supertest');
const app = require('../../src/app');
const env = require('../../src/config/env');
const {
  seedPerson, seedNgo, seedBhangarwala, authHeader,
} = require('../fixtures');

// Minimal buffers carrying the right magic bytes
const PNG = Buffer.concat([Buffer.from('89504e470d0a1a0a', 'hex'), Buffer.alloc(32)]);
const JPEG = Buffer.concat([Buffer.from('ffd8ffe0', 'hex'), Buffer.alloc(32)]);
const WEBP = Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBP'), Buffer.alloc(16)]);
const PDF = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\n');

const files = () => (fs.existsSync(env.UPLOAD_DIR) ? fs.readdirSync(env.UPLOAD_DIR) : []);

const uploadImage = (user, buf, filename = 'photo.png', contentType = 'image/png', field = 'file') =>
  request(app)
    .post('/api/uploads/image')
    .set(user ? authHeader(user) : {})
    .attach(field, buf, { filename, contentType });

const uploadDoc = (user, buf, filename = 'doc.pdf', contentType = 'application/pdf') =>
  request(app)
    .post('/api/uploads/document')
    .set(authHeader(user))
    .attach('file', buf, { filename, contentType });

afterAll(() => {
  fs.rmSync(env.UPLOAD_DIR, { recursive: true, force: true });
});

describe('E06 POST /api/uploads/image', () => {
  it('uploads a PNG -> 201 and the returned URL serves the file', async () => {
    const res = await uploadImage(await seedPerson(), PNG);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.url).toMatch(/^\/uploads\/[0-9a-f-]{36}\.png$/);

    const served = await request(app).get(res.body.data.url);
    expect(served.status).toBe(200);
    expect(served.headers['content-type']).toMatch(/image\/png/);
    expect(served.headers['x-content-type-options']).toBe('nosniff');
  });

  it('accepts JPEG and WebP', async () => {
    const person = await seedPerson();
    const jpg = await uploadImage(person, JPEG, 'a.jpg', 'image/jpeg');
    const webp = await uploadImage(person, WEBP, 'a.webp', 'image/webp');
    expect(jpg.status).toBe(201);
    expect(jpg.body.data.url).toMatch(/\.jpg$/);
    expect(webp.status).toBe(201);
    expect(webp.body.data.url).toMatch(/\.webp$/);
  });

  it('is open to every authenticated role', async () => {
    for (const user of [await seedNgo(), await seedBhangarwala()]) {
      expect((await uploadImage(user, PNG)).status).toBe(201);
    }
  });

  it('never uses the client-supplied filename', async () => {
    const res = await uploadImage(await seedPerson(), PNG, '../../evil name.png');
    expect(res.status).toBe(201);
    expect(res.body.data.url).not.toContain('evil');
  });

  it('401 without a token', async () => {
    const res = await uploadImage(null, PNG);
    expect(res.status).toBe(401);
  });

  it('400 for a PDF sent to the image route', async () => {
    const res = await uploadImage(await seedPerson(), PDF, 'doc.pdf', 'application/pdf');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('400 and nothing left on disk when the content does not match the declared type', async () => {
    const before = files().length;
    const res = await uploadImage(await seedPerson(), Buffer.from('this is not a png at all'));
    expect(res.status).toBe(400);
    expect(files()).toHaveLength(before);
  });

  it('400 for a file over 5 MB', async () => {
    const big = Buffer.concat([PNG, Buffer.alloc(5 * 1024 * 1024)]);
    const res = await uploadImage(await seedPerson(), big);
    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/too large/i);
  });

  it('400 when no file is sent', async () => {
    const res = await request(app)
      .post('/api/uploads/image')
      .set(authHeader(await seedPerson()))
      .field('note', 'no file here');
    expect(res.status).toBe(400);
  });

  it('400 when the file is in the wrong field', async () => {
    const res = await uploadImage(await seedPerson(), PNG, 'p.png', 'image/png', 'photo');
    expect(res.status).toBe(400);
  });
});

describe('E07 POST /api/uploads/document', () => {
  it('lets an NGO upload a PDF (verified or not)', async () => {
    const res = await uploadDoc(await seedNgo({ verified: false }), PDF);
    expect(res.status).toBe(201);
    expect(res.body.data.url).toMatch(/^\/uploads\/[0-9a-f-]{36}\.pdf$/);
    expect((await request(app).get(res.body.data.url)).status).toBe(200);
  });

  it('403 for a person and for a bhangarwala', async () => {
    for (const user of [await seedPerson(), await seedBhangarwala()]) {
      const res = await uploadDoc(user, PDF);
      expect(res.status).toBe(403);
      expect(res.body.error.code).toBe('FORBIDDEN');
    }
  });

  it('403 rejected callers do not write to disk', async () => {
    const before = files().length;
    await uploadDoc(await seedPerson(), PDF);
    expect(files()).toHaveLength(before);
  });

  it('400 for an image sent to the document route', async () => {
    const res = await uploadDoc(await seedNgo(), PNG, 'p.png', 'image/png');
    expect(res.status).toBe(400);
  });

  it('400 for a file over 10 MB', async () => {
    const big = Buffer.concat([PDF, Buffer.alloc(10 * 1024 * 1024)]);
    const res = await uploadDoc(await seedNgo(), big);
    expect(res.status).toBe(400);
  });
});

describe('E08 GET /api/config/festival-calendar', () => {
  it('returns the calendar to a person and to an NGO', async () => {
    for (const user of [await seedPerson(), await seedNgo()]) {
      const res = await request(app).get('/api/config/festival-calendar').set(authHeader(user));
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(4);
      res.body.data.forEach((f) => {
        expect(f).toEqual({ name: expect.any(String), date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/), shiftDays: expect.any(Number) });
      });
    }
  });

  it('403 for a bhangarwala', async () => {
    const res = await request(app)
      .get('/api/config/festival-calendar')
      .set(authHeader(await seedBhangarwala()));
    expect(res.status).toBe(403);
  });

  it('401 without a token', async () => {
    expect((await request(app).get('/api/config/festival-calendar')).status).toBe(401);
  });
});
