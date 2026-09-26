const { JOB_STATUSES, nextJobStatus, assertTransition } = require('../../src/services/jobState');

const invalid = expect.objectContaining({ status: 409, code: 'INVALID_TRANSITION' });

describe('nextJobStatus', () => {
  it.each([
    ['assigned', 'heading'],
    ['heading', 'arrived'],
    ['arrived', 'picked_up'],
    ['picked_up', 'completed'],
  ])('%s -> %s', (from, to) => {
    expect(nextJobStatus(from)).toBe(to);
  });

  it('throws past completed', () => {
    expect(() => nextJobStatus('completed')).toThrow(invalid);
  });

  it('throws for an unknown status', () => {
    expect(() => nextJobStatus('teleported')).toThrow(invalid);
  });
});

describe('assertTransition', () => {
  it('accepts every valid step', () => {
    for (let i = 0; i < JOB_STATUSES.length - 1; i += 1) {
      expect(assertTransition(JOB_STATUSES[i], JOB_STATUSES[i + 1])).toBe(JOB_STATUSES[i + 1]);
    }
  });

  it('rejects skipping a step', () => {
    expect(() => assertTransition('heading', 'completed')).toThrow(invalid);
  });

  it('rejects moving backwards', () => {
    expect(() => assertTransition('arrived', 'heading')).toThrow(invalid);
  });

  it('rejects repeating the current status', () => {
    expect(() => assertTransition('heading', 'heading')).toThrow(invalid);
  });

  it('rejects any move out of completed', () => {
    expect(() => assertTransition('completed', 'assigned')).toThrow(invalid);
  });
});
