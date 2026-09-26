/**
 * env.js — loads and validates environment variables (fails fast on bad config).
 * Exports the parsed config; loadEnv(source) is attached for testing.
 */

require('dotenv').config();
const path = require('path');
const Joi = require('joi');

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(3000),
  MONGO_URI: Joi.string().when('NODE_ENV', {
    is: 'test',
    then: Joi.optional(), // tests use mongodb-memory-server
    otherwise: Joi.required(),
  }),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_REFRESH_SECRET: Joi.string().min(16).required(),
  DEMO_MODE: Joi.boolean().truthy('true').falsy('false').default(false),
  PAYMENT_MODE: Joi.string().valid('simulated', 'razorpay_test').default('simulated'),
  CORS_ORIGINS: Joi.string().allow('').default(''),
  UPLOAD_DIR: Joi.string().default(path.resolve(__dirname, '../../uploads')),
}).unknown(true);

function loadEnv(source = process.env) {
  const { error, value } = schema.validate(source, { abortEarly: false });
  if (error) {
    throw new Error(`Invalid environment: ${error.details.map((d) => d.message).join('; ')}`);
  }
  return {
    NODE_ENV: value.NODE_ENV,
    PORT: value.PORT,
    MONGO_URI: value.MONGO_URI,
    JWT_SECRET: value.JWT_SECRET,
    JWT_REFRESH_SECRET: value.JWT_REFRESH_SECRET,
    DEMO_MODE: value.DEMO_MODE,
    PAYMENT_MODE: value.PAYMENT_MODE,
    CORS_ORIGINS: value.CORS_ORIGINS
      ? value.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    UPLOAD_DIR: path.resolve(value.UPLOAD_DIR),
  };
}

module.exports = loadEnv();
Object.defineProperty(module.exports, 'loadEnv', { value: loadEnv });
