const Joi = require('joi');
const validate = require('../../src/middleware/validate');

const schemas = {
  body: Joi.object({ name: Joi.string().required(), age: Joi.number().default(18) }),
  query: Joi.object({ limit: Joi.number().integer().min(1).default(10) }),
  params: Joi.object({ id: Joi.string().length(3).required() }),
};

describe('validate middleware', () => {
  it('passes valid input, applies defaults, coerces and strips unknown keys', () => {
    const req = { body: { name: 'A', extra: 1 }, query: { limit: '5' }, params: { id: 'abc' } };
    const next = jest.fn();
    validate(schemas)(req, {}, next);
    expect(next).toHaveBeenCalledWith();
    expect(req.body).toEqual({ name: 'A', age: 18 });
    expect(req.query).toEqual({ limit: 5 });
  });

  it('rejects bad input with 400 and detailed paths across all parts', () => {
    const req = { body: {}, query: { limit: '0' }, params: { id: 'x' } };
    const next = jest.fn();
    validate(schemas)(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(400);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(err.details.map((d) => d.path).sort()).toEqual(['body.name', 'params.id', 'query.limit']);
  });

  it('skips parts that have no schema', () => {
    const req = { body: { anything: true } };
    const next = jest.fn();
    validate({ query: Joi.object({}) })(req, {}, next);
    expect(next).toHaveBeenCalledWith();
    expect(req.body).toEqual({ anything: true });
  });
});
