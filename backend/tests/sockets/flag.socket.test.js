/** S07 contract:new (E38) and S09 contract:flag-raised (E42). */

const request = require('supertest');
const app = require('../../src/app');
const { Contribution } = require('../../src/models');
const {
  seedSociety, seedOfficer, seedResident, seedNgo, seedContract, authHeader,
} = require('../fixtures');
const { startTestServer, waitFor, expectNoEvent } = require('./helpers');

const api = (method, path, user) => request(app)[method](path).set(authHeader(user));

let t;
beforeAll(async () => { t = await startTestServer(); });
afterAll(async () => { await t.close(); });

async function setup(promised = 30) {
  const society = await seedSociety();
  const cp = await seedOfficer({ role: 'cp', societyId: society._id });
  const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
  const resident = await seedResident({ societyId: society._id });
  const ngo = await seedNgo({ verified: true });
  const contract = await seedContract({ societyId: society._id, ngoId: ngo._id, status: 'active', materialType: 'plastic' });
  if (promised) {
    await Contribution.create({
      userId: resident._id, societyId: society._id, category: 'plastic', weightKg: promised,
    });
  }
  return {
    society, cp, treasurer, resident, ngo, contract,
  };
}

describe('S07 contract:new', () => {
  it('reaches the society\'s officers only', async () => {
    const { society, cp, treasurer, resident } = await setup(0);
    const otherCp = await seedOfficer({ role: 'cp' });
    const ngo = await seedNgo({ verified: true });
    const [scp, str, sres, sother, sngo] = await Promise.all(
      [cp, treasurer, resident, otherCp, ngo].map((u) => t.connectAs(u))
    );

    const gots = [waitFor(scp, 'contract:new'), waitFor(str, 'contract:new')];
    const nones = [
      expectNoEvent(sres, 'contract:new'),
      expectNoEvent(sother, 'contract:new'),
      expectNoEvent(sngo, 'contract:new'),
    ];
    const res = await api('post', '/api/contracts', ngo)
      .send({ societyId: society.id, materialType: 'paper', quantityKg: 80, ratePerKg: 9 })
      .expect(201);

    const [payload] = await Promise.all(gots);
    expect(payload.contract).toMatchObject({
      id: res.body.data.contract.id, status: 'offered', materialType: 'paper', societyId: society.id,
    });
    expect(payload.contract.ngo).toMatchObject({ id: ngo.id, name: ngo.name });
    await Promise.all(nones);
  });

  it('is not emitted when the NGO is not verified', async () => {
    const { society, cp } = await setup(0);
    const scp = await t.connectAs(cp);
    const none = expectNoEvent(scp, 'contract:new');
    await api('post', '/api/contracts', await seedNgo())
      .send({ societyId: society.id, materialType: 'paper', quantityKg: 80, ratePerKg: 9 })
      .expect(403);
    await none;
  });
});

describe('S09 contract:flag-raised', () => {
  it('reaches both officers and the NGO with { contractId, promisedKg, actualKg, trustScore }', async () => {
    const { cp, treasurer, resident, ngo, contract } = await setup(30);
    const otherCp = await seedOfficer({ role: 'cp' });
    const [scp, str, sngo, sres, sother] = await Promise.all(
      [cp, treasurer, ngo, resident, otherCp].map((u) => t.connectAs(u))
    );

    const gots = [scp, str, sngo].map((s) => waitFor(s, 'contract:flag-raised'));
    const nones = [expectNoEvent(sres, 'contract:flag-raised'), expectNoEvent(sother, 'contract:flag-raised')];
    await api('post', `/api/contracts/${contract.id}/collections`, ngo).send({ actualKg: 20 }).expect(201);

    for (const payload of await Promise.all(gots)) {
      expect(payload).toEqual({
        contractId: contract.id, promisedKg: 30, actualKg: 20, trustScore: 47,
      });
    }
    await Promise.all(nones);
  });

  it('is not emitted for a clean collection', async () => {
    const { cp, ngo, contract } = await setup(30);
    const [scp, sngo] = await Promise.all([cp, ngo].map((u) => t.connectAs(u)));

    const nones = [expectNoEvent(scp, 'contract:flag-raised'), expectNoEvent(sngo, 'contract:flag-raised')];
    await api('post', `/api/contracts/${contract.id}/collections`, ngo).send({ actualKg: 30 }).expect(201);
    await Promise.all(nones);
  });

  it('is not emitted when the collection is refused', async () => {
    const { cp, ngo, society } = await setup(30);
    const offered = await seedContract({ societyId: society._id, ngoId: ngo._id, status: 'offered' });
    const scp = await t.connectAs(cp);

    const none = expectNoEvent(scp, 'contract:flag-raised');
    await api('post', `/api/contracts/${offered.id}/collections`, ngo).send({ actualKg: 0 }).expect(409);
    await none;
  });
});
