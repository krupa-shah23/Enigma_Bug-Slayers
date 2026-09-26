const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');

const { Schema } = mongoose;

const flagSchema = new Schema(
  {
    societyId: { type: Schema.Types.ObjectId, ref: 'Society', required: true },
    contractId: { type: Schema.Types.ObjectId, ref: 'Contract', required: true },
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
    promisedKg: { type: Number, required: true, min: 0 },
    actualKg: { type: Number, required: true, min: 0 },
    shortfallKg: { type: Number, required: true, min: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

flagSchema.index({ societyId: 1, createdAt: -1 });

applyToJSON(flagSchema);

module.exports = mongoose.model('Flag', flagSchema);
