const { ok, fail } = require('../../src/lib/response');
const AppError = require('../../src/lib/AppError');
const asyncHandler = require('../../src/lib/asyncHandler');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('response envelope', () => {
  it('ok defaults to 200 with an empty data object', () => {
    const res = mockRes();
    ok(res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });

  it('ok honours data and status', () => {
    const res = mockRes();
    ok(res, { id: 1 }, 201);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: { id: 1 } });
  });

  it('fail builds the error envelope', () => {
    const res = mockRes();
    fail(res, 403, 'FORBIDDEN', 'nope');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: { code: 'FORBIDDEN', message: 'nope' },
    });
  });

  it('fail includes details only when given', () => {
    const res = mockRes();
    fail(res, 400, 'VALIDATION_ERROR', 'bad', [{ path: 'x' }]);
    expect(res.json.mock.calls[0][0].error.details).toEqual([{ path: 'x' }]);
  });
});

describe('AppError', () => {
  it('carries status, code, message and details', () => {
    const e = new AppError(409, 'EMAIL_TAKEN', 'taken', [1]);
    expect(e).toBeInstanceOf(Error);
    expect([e.status, e.code, e.message, e.details]).toEqual([409, 'EMAIL_TAKEN', 'taken', [1]]);
  });
});

describe('asyncHandler', () => {
  it('forwards rejected promises to next', async () => {
    const err = new Error('boom');
    const next = jest.fn();
    await asyncHandler(async () => { throw err; })({}, {}, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('does not call next on success', async () => {
    const next = jest.fn();
    await asyncHandler(async () => 'fine')({}, {}, next);
    expect(next).not.toHaveBeenCalled();
  });
});
