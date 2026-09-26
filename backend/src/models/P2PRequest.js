const mongoose = require('mongoose');
const { applyToJSON, locationSchema } = require('./plugins');
const { CATEGORIES, REQUEST_STATUSES } = require('../config/constants');

const { Schema } = mongoose;

const p2pRequestSchema = new Schema(
  {
    personId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    photoUrl: { type: String, required: true },
    description: { type: String, trim: true },
    category: { type: String, enum: CATEGORIES, required: true },
    location: { type: locationSchema, required: true },
    status: { type: String, enum: REQUEST_STATUSES, default: 'open' },
    notifiedBhangarwalaIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
  },
  { timestamps: true }
);

p2pRequestSchema.index({ personId: 1, status: 1 });
p2pRequestSchema.index({ notifiedBhangarwalaIds: 1, status: 1 });

applyToJSON(p2pRequestSchema);

module.exports = mongoose.model('P2PRequest', p2pRequestSchema);
