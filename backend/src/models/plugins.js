/**
 * Shared schema helpers.
 */

const { Schema } = require('mongoose');

const HIDDEN_FIELDS = ['__v', 'passwordHash', 'refreshTokenHash'];

/** toJSON: _id -> id, and never expose secrets or __v. */
function applyToJSON(schema) {
  schema.set('toJSON', {
    transform(_doc, ret) {
      if (ret._id) {
        ret.id = ret._id.toString();
        delete ret._id;
      }
      HIDDEN_FIELDS.forEach((f) => delete ret[f]);
      return ret;
    },
  });
}

/** Reusable { lat, lng } sub-document (no _id). */
const locationSchema = new Schema(
  {
    lat: { type: Number, required: true, min: -90, max: 90 },
    lng: { type: Number, required: true, min: -180, max: 180 },
  },
  { _id: false }
);

module.exports = { applyToJSON, locationSchema };
