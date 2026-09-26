const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../src/app');
const { User } = require('../../src/models');
const { seedPerson, authHeader, signToken, DEFAULT_PASSWORD } = require('../fixtures');

const signup = (overrides = {}) =>
  request(app).post('/api/auth/signup').send({
    name: 'Asha',
    email: 'asha@test.com',
    password: 'Password123!',
    phone: '9000000001',
    role: 'person',
    ...overrides,
  });

describe('E01 POST /api/auth/signup', () => {
  it.each(['person', 'ngo', 'bhangarwala'])('creates a %s and returns both tokens', async (role) => {
    const res = await signup({ role });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toEqual(expect.any(String));
    expect(res.body.data.refreshToken).toEqual(expect.any(String));
    expect(res.body.data.user.role).toBe(role);
    expect(res.body.data.user).not.toHaveProperty('passwordHash');
    expect(res.body.data.user).not.toHaveProperty('refreshTokenHash');
  });

  it('starts an NGO at verificationStatus none, and a bhangarwala offline', async () => {
    const ngo = await signup({ role: 'ngo', email: 'n@test.com' });
    expect(ngo.body.data.user.ngo.verificationStatus).toBe('none');
    const b = await signup({ role: 'bhangarwala', email: 'b@test.com' });
    expect(b.body.data.user.bhangarwala.isOnline).toBe(false);
  });

  it('409 EMAIL_TAKEN on a duplicate email (case-insensitive)', async () => {
    await signup();
    const res = await signup({ email: 'ASHA@test.com' });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_TAKEN');
  });

  it('400 on an invalid role', async () => {
    const res = await signup({ role: 'admin' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('400 on a missing role', async () => {
    const res = await signup({ role: undefined });
    expect(res.status).toBe(400);
  });

  it('400 on a short password, bad email or missing phone', async () => {
    expect((await signup({ password: 'short' })).status).toBe(400);
    expect((await signup({ email: 'not-an-email' })).status).toBe(400);
    expect((await signup({ phone: undefined })).status).toBe(400);
  });

  it('stores only a bcrypt hash of the password', async () => {
    await signup();
    const u = await User.findOne({ email: 'asha@test.com' });
    expect(u.passwordHash).toMatch(/^\$2[aby]\$/);
    expect(u.passwordHash).not.toContain('Password123!');
  });
});

describe('E02 POST /api/auth/login', () => {
  it('returns a JWT whose payload is { sub, role }', async () => {
    const user = await seedPerson({ email: 'login@test.com' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@test.com', password: DEFAULT_PASSWORD });
    expect(res.status).toBe(200);
    const payload = jwt.decode(res.body.data.accessToken);
    expect(payload.sub).toBe(user.id);
    expect(payload.role).toBe('person');
    expect(payload.exp - payload.iat).toBe(15 * 60);
  });

  it('401 on the wrong password', async () => {
    await seedPerson({ email: 'login@test.com' });
    const res = await request(app).post('/api/auth/login').send({ email: 'login@test.com', password: 'wrong-pass' });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHENTICATED');
  });

  it('401 on an unknown email', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'ghost@test.com', password: 'whatever1' });
    expect(res.status).toBe(401);
  });

  it('400 on a missing password', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'a@test.com' });
    expect(res.status).toBe(400);
  });
});

describe('E04 GET /api/auth/me', () => {
  it('returns the user without secrets', async () => {
    const user = await seedPerson();
    const res = await request(app).get('/api/auth/me').set(authHeader(user));
    expect(res.status).toBe(200);
    expect(res.body.data.user.id).toBe(user.id);
    expect(res.body.data.user).not.toHaveProperty('passwordHash');
    expect(res.body.data.user).not.toHaveProperty('refreshTokenHash');
  });

  it('401 with no token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHENTICATED');
  });

  it('401 with a malformed Authorization header', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', 'Token abc');
    expect(res.status).toBe(401);
  });

  it('401 with a garbage token', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', 'Bearer not.a.jwt');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHENTICATED');
  });

  it('401 TOKEN_EXPIRED for an expired token', async () => {
    const user = await seedPerson();
    const expired = signToken(user, { expiresIn: -10 });
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${expired}`);
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('TOKEN_EXPIRED');
  });

  it('401 when the user no longer exists', async () => {
    const user = await seedPerson();
    const headers = authHeader(user);
    await User.deleteOne({ _id: user._id });
    const res = await request(app).get('/api/auth/me').set(headers);
    expect(res.status).toBe(401);
  });

  it('401 when the token subject is not a valid id', async () => {
    const token = jwt.sign({ sub: 'nope', role: 'person' }, process.env.JWT_SECRET);
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(401);
  });

  it('reads societyId/societyRole fresh from the database', async () => {
    const user = await seedPerson();
    const headers = authHeader(user);
    await User.updateOne({ _id: user._id }, { societyRole: 'resident' });
    const res = await request(app).get('/api/auth/me').set(headers);
    expect(res.body.data.user.societyRole).toBe('resident');
  });
});

describe('E05 POST /api/auth/refresh-token and E03 logout', () => {
  const login = async () => {
    await seedPerson({ email: 'r@test.com' });
    const res = await request(app).post('/api/auth/login').send({ email: 'r@test.com', password: DEFAULT_PASSWORD });
    return res.body.data;
  };

  it('rotates the pair and rejects the old refresh token', async () => {
    const { refreshToken } = await login();

    const rotated = await request(app).post('/api/auth/refresh-token').send({ refreshToken });
    expect(rotated.status).toBe(200);
    expect(rotated.body.data.refreshToken).not.toBe(refreshToken);
    expect(rotated.body.data.accessToken).toEqual(expect.any(String));

    const replay = await request(app).post('/api/auth/refresh-token').send({ refreshToken });
    expect(replay.status).toBe(401);

    const again = await request(app)
      .post('/api/auth/refresh-token')
      .send({ refreshToken: rotated.body.data.refreshToken });
    expect(again.status).toBe(200);
  });

  it('stores the refresh token hashed, never in plain text', async () => {
    const { refreshToken } = await login();
    const u = await User.findOne({ email: 'r@test.com' });
    expect(u.refreshTokenHash).toMatch(/^\$2[aby]\$/);
    expect(u.refreshTokenHash).not.toContain(refreshToken);
  });

  it('logout revokes the refresh token', async () => {
    const { accessToken, refreshToken } = await login();

    const out = await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${accessToken}`);
    expect(out.status).toBe(200);
    expect(out.body).toEqual({ success: true, data: {} });

    const res = await request(app).post('/api/auth/refresh-token').send({ refreshToken });
    expect(res.status).toBe(401);
  });

  it('logout requires authentication', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.status).toBe(401);
  });

  it('rejects an access token used as a refresh token', async () => {
    const { accessToken } = await login();
    const res = await request(app).post('/api/auth/refresh-token').send({ refreshToken: accessToken });
    expect(res.status).toBe(401);
  });

  it('401 TOKEN_EXPIRED for an expired refresh token', async () => {
    const user = await seedPerson();
    const expired = jwt.sign({ sub: user.id, role: 'person' }, process.env.JWT_REFRESH_SECRET, { expiresIn: -10 });
    const res = await request(app).post('/api/auth/refresh-token').send({ refreshToken: expired });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('TOKEN_EXPIRED');
  });

  it('401 for a validly signed refresh token that was never issued', async () => {
    const user = await seedPerson(); // has no refreshTokenHash
    const forged = jwt.sign({ sub: user.id, role: 'person' }, process.env.JWT_REFRESH_SECRET);
    const res = await request(app).post('/api/auth/refresh-token').send({ refreshToken: forged });
    expect(res.status).toBe(401);
  });

  it('401 when the user has been deleted', async () => {
    const { refreshToken } = await login();
    await User.deleteMany({});
    const res = await request(app).post('/api/auth/refresh-token').send({ refreshToken });
    expect(res.status).toBe(401);
  });

  it('400 when the body has no refreshToken', async () => {
    const res = await request(app).post('/api/auth/refresh-token').send({});
    expect(res.status).toBe(400);
  });
});
