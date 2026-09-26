const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');
const { CATEGORIES, PAYMENT_STATUSES } = require('../config/constants');

const { Schema } = mongoose;

const collectionSchema = new Schema({
  contractId: { type: Schema.Types.ObjectId, ref: 'Contract', required: true },
  societyId: { type: Schema.Types.ObjectId, ref: 'Society', required: true },
  ngoId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: CATEGORIES, required: true },
  windowStart: { type: Date, required: true },
  windowEnd: { type: Date, required: true },
  promisedKg: { type: Number, required: true, min: 0 },
  actualKg: { type: Number, required: true, min: 0 },
  flagged: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: PAYMENT_STATUSES, default: 'unpaid' },
  paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
  collectedAt: { type: Date, default: Date.now },
});

collectionSchema.index({ societyId: 1, category: 1, collectedAt: 1 });
collectionSchema.index({ contractId: 1, collectedAt: -1 });

applyToJSON(collectionSchema);

module.exports = mongoose.model('Collection', collectionSchema);
