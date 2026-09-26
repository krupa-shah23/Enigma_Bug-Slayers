const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');
const { CATEGORIES, CONTRACT_STATUSES } = require('../config/constants');

const { Schema } = mongoose;

const contractSchema = new Schema(
  {
    ngoId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    societyId: { type: Schema.Types.ObjectId, ref: 'Society', required: true },
    materialType: { type: String, enum: CATEGORIES, required: true },
    quantityKg: { type: Number, required: true, min: 0 },
    ratePerKg: { type: Number, required: true, min: 0 }, // rupees
    status: { type: String, enum: CONTRACT_STATUSES, default: 'offered' },
    acceptedAt: Date,
    acceptedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

contractSchema.index({ ngoId: 1, status: 1 });
contractSchema.index({ societyId: 1, status: 1 });

applyToJSON(contractSchema);

module.exports = mongoose.model('Contract', contractSchema);
