/**
 * AppError — an operational error carrying an HTTP status and a machine code.
 * Throw it anywhere (inside asyncHandler-wrapped routes) and errorHandler
 * turns it into the standard failure envelope.
 */
class AppError extends Error {
  constructor(status, code, message, details) {
    super(message || code);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    if (details !== undefined) this.details = details;
  }
}

module.exports = AppError;
