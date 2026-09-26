/** S08 — contract:accepted is emitted to the NGO when an officer accepts (E19). */

const request = require('supertest');
const app = require('../../src/app');
const {
  seedSociety, seedOfficer, seedNgo, seedContract, authHeader,
} = require('../fixtures');
const { startTestServer, waitFor, expectNoEvent } = require('./helpers');

let t;
beforeAll(async () => { t = await startTestServer(); });
afterAll(async () => { await t.close(); });

describe('S08 contract:accepted', () => {
  it('reaches the owning NGO with { contractId, societyId }', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const ngo = await seedNgo({ verified: true });
    const otherNgo = await seedNgo({ verified: true });
    const contract = await seedContract({ societyId: society._id, ngoId: ngo._id, status: 'offered' });
    const [ngoSocket, otherSocket] = [await t.connectAs(ngo), await t.connectAs(otherNgo)];

    const got = waitFor(ngoSocket, 'contract:accepted');
    const none = expectNoEvent(otherSocket, 'contract:accepted');
    await request(app)
      .post(`/api/societies/${society.id}/contracts/${contract.id}/accept`)
      .set(authHeader(cp))
      .expect(200);

    expect(await got).toEqual({ contractId: contract.id, societyId: society.id });
    await none;
  });

  it('is not emitted when the accept is refused', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const ngo = await seedNgo({ verified: true });
    const contract = await seedContract({ societyId: society._id, ngoId: ngo._id, status: 'active' });
    const socket = await t.connectAs(ngo);

    const none = expectNoEvent(socket, 'contract:accepted');
    await request(app)
      .post(`/api/societies/${society.id}/contracts/${contract.id}/accept`)
      .set(authHeader(cp))
      .expect(409);
    await none;
  });
});
