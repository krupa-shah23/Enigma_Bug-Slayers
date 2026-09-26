/**
 * validate({ body, query, params }) — Joi schemas per request part.
 * Valid values replace the originals (defaults applied, unknown keys stripped).
 * On failure -> AppError 400 VALIDATION_ERROR with `details` [{ path, message }].
 */

const AppError = require('../lib/AppError');

const PARTS = ['params', 'query', 'body'];

function validate(schemas) {
  return (req, _res, next) => {
    const details = [];

    for (const part of PARTS) {
      if (!schemas[part]) continue;
      const { error, value } = schemas[part].validate(req[part] || {}, {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });
      if (error) {
        error.details.forEach((d) =>
          details.push({ path: [part, ...d.path].join('.'), message: d.message })
        );
      } else {
        req[part] = value;
      }
    }

    if (details.length) {
      return next(new AppError(400, 'VALIDATION_ERROR', 'Validation failed', details));
    }
    return next();
  };
}

module.exports = validate;
