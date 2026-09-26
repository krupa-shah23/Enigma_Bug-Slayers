/**
 * Central error handler — must be registered last in app.js.
 *
 * Mapping:
 *   AppError                    -> its own status/code
 *   Joi validation error        -> 400 VALIDATION_ERROR
 *   Mongoose ValidationError    -> 400 VALIDATION_ERROR
 *   malformed JSON body         -> 400 VALIDATION_ERROR
 *   Mongoose CastError          -> 404 NOT_FOUND (e.g. bad ObjectId in a URL)
 *   Mongo duplicate key (11000) -> 409 (EMAIL_TAKEN for email, else DUPLICATE_KEY)
 *   anything else               -> 500 INTERNAL_ERROR
 */

const AppError = require('../lib/AppError');
const { fail } = require('../lib/response');

function joiDetails(err) {
  return err.details.map((d) => ({
    path: d.path.join('.'),
    message: d.message,
  }));
}

// Express identifies error handlers by their 4-argument signature.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return fail(res, err.status, err.code, err.message, err.details);
  }

  if (err && err.isJoi) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Validation failed', joiDetails(err));
  }

  if (err && err.name === 'ValidationError' && err.errors) {
    const details = Object.values(err.errors).map((e) => ({
      path: e.path,
      message: e.message,
    }));
    return fail(res, 400, 'VALIDATION_ERROR', 'Validation failed', details);
  }

  if (err && err.type === 'entity.parse.failed') {
    return fail(res, 400, 'VALIDATION_ERROR', 'Malformed JSON body');
  }

  if (err && err.name === 'CastError') {
    return fail(res, 404, 'NOT_FOUND', 'Resource not found');
  }

  if (err && err.code === 11000) {
    const keys = Object.keys(err.keyPattern || err.keyValue || {});
    if (keys.includes('email')) {
      return fail(res, 409, 'EMAIL_TAKEN', 'Email is already registered');
    }
    return fail(res, 409, 'DUPLICATE_KEY', 'Duplicate value');
  }

  if (process.env.NODE_ENV !== 'test') console.error(err);
  return fail(res, 500, 'INTERNAL_ERROR', 'Something went wrong');
}

module.exports = errorHandler;
