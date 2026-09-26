const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');
const { QUOTE_STATUSES } = require('../config/constants');

const { Schema } = mongoose;

const quoteSchema = new Schema(
  {
    requestId: { type: Schema.Types.ObjectId, ref: 'P2PRequest', required: true },
    bhangarwalaId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: {
      type: Number,
      required: true,
      validate: { validator: (p) => p > 0, message: 'price must be > 0' },
    }, // rupees
    distanceKm: { type: Number, required: true, min: 0 },
    etaMinutes: { type: Number, required: true, min: 0 },
    status: { type: String, enum: QUOTE_STATUSES, default: 'pending' },
  },
  { timestamps: true }
);

// One quote per bhangarwala per request (-> 409 ALREADY_QUOTED)
quoteSchema.index({ requestId: 1, bhangarwalaId: 1 }, { unique: true });

applyToJSON(quoteSchema);

module.exports = mongoose.model('Quote', quoteSchema);
