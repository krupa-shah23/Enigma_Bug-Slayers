/**
 * jobState.js — strictly sequential job status machine.
 * assigned -> heading -> arrived -> picked_up -> completed
 */

const AppError = require('../lib/AppError');

const JOB_STATUSES = ['assigned', 'heading', 'arrived', 'picked_up', 'completed'];

/** The only status a job may move to next. Throws 409 for unknown or terminal states. */
function nextJobStatus(current) {
  const i = JOB_STATUSES.indexOf(current);
  if (i === -1 || i === JOB_STATUSES.length - 1) {
    throw new AppError(409, 'INVALID_TRANSITION', `No transition available from '${current}'`);
  }
  return JOB_STATUSES[i + 1];
}

/** Throws 409 INVALID_TRANSITION unless `requested` is exactly the next status. */
function assertTransition(current, requested) {
  const expected = nextJobStatus(current);
  if (requested !== expected) {
    throw new AppError(
      409,
      'INVALID_TRANSITION',
      `Cannot move from '${current}' to '${requested}' (expected '${expected}')`
    );
  }
  return expected;
}

module.exports = { JOB_STATUSES, nextJobStatus, assertTransition };
