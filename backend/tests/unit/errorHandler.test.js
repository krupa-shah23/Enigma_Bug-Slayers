const Joi = require('joi');
const errorHandler = require('../../src/middleware/errorHandler');
const AppError = require('../../src/lib/AppError');

function run(err) {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  errorHandler(err, {}, res, () => {});
  return { status: res.status.mock.calls[0][0], body: res.json.mock.calls[0][0] };
}

describe('errorHandler', () => {
  it('maps AppError to its own status and code', () => {
    const { status, body } = run(new AppError(403, 'FORBIDDEN', 'no'));
    expect(status).toBe(403);
    expect(body).toEqual({ success: false, error: { code: 'FORBIDDEN', message: 'no' } });
  });

  it('maps Joi errors to 400 VALIDATION_ERROR with details', () => {
    const { error } = Joi.object({ a: Joi.number().required() }).validate({}, { abortEarly: false });
    const { status, body } = run(error);
    expect(status).toBe(400);
    expect(body.error.code).toBe('VALIDATION_ERROR');
    expect(body.error.details[0].path).toBe('a');
  });

  it('maps Mongoose ValidationError to 400', () => {
    const err = Object.assign(new Error('v'), {
      name: 'ValidationError',
      errors: { name: { path: 'name', message: 'required' } },
    });
    const { status, body } = run(err);
    expect(status).toBe(400);
    expect(body.error.details).toEqual([{ path: 'name', message: 'required' }]);
  });

  it('maps malformed JSON to 400', () => {
    const { status, body } = run(Object.assign(new Error('x'), { type: 'entity.parse.failed' }));
    expect(status).toBe(400);
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });

  it('maps CastError to 404 NOT_FOUND', () => {
    const { status, body } = run(Object.assign(new Error('c'), { name: 'CastError' }));
    expect(status).toBe(404);
    expect(body.error.code).toBe('NOT_FOUND');
  });

  it('maps duplicate email key to 409 EMAIL_TAKEN', () => {
    const { status, body } = run(Object.assign(new Error('d'), { code: 11000, keyPattern: { email: 1 } }));
    expect(status).toBe(409);
    expect(body.error.code).toBe('EMAIL_TAKEN');
  });

  it('maps other duplicate keys to 409 DUPLICATE_KEY', () => {
    const { status, body } = run(Object.assign(new Error('d'), { code: 11000, keyValue: { x: 1 } }));
    expect(status).toBe(409);
    expect(body.error.code).toBe('DUPLICATE_KEY');
  });

  it('maps unknown errors to 500 without leaking the message', () => {
    const { status, body } = run(new Error('secret internals'));
    expect(status).toBe(500);
    expect(body.error.code).toBe('INTERNAL_ERROR');
    expect(JSON.stringify(body)).not.toContain('secret internals');
  });
});
