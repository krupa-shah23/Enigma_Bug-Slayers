const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');
const { PAYMENT_MODES } = require('../config/constants');

const { Schema } = mongoose;

const splitSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    weightKg: { type: Number, required: true, min: 0 },
    sharePaise: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const paymentSchema = new Schema(
  {
    contractId: { type: Schema.Types.ObjectId, ref: 'Contract', required: true },
    // unique: a collection can be paid only once (guards double trigger)
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true, unique: true },
    ngoId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    societyId: { type: Schema.Types.ObjectId, ref: 'Society', required: true },
    amountPaise: { type: Number, required: true, min: 0 },
    splits: { type: [splitSchema], default: [] },
    unallocatedPaise: { type: Number, default: 0, min: 0 },
    mode: { type: String, enum: PAYMENT_MODES, default: 'simulated' },
    status: { type: String, enum: ['completed'], default: 'completed' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

paymentSchema.index({ ngoId: 1, createdAt: -1 });
paymentSchema.index({ societyId: 1, createdAt: -1 });

applyToJSON(paymentSchema);

module.exports = mongoose.model('Payment', paymentSchema);
