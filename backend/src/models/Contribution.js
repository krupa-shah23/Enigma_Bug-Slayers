const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');
const { CATEGORIES, MAX_CONTRIBUTION_KG } = require('../config/constants');

const { Schema } = mongoose;

const contributionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  societyId: { type: Schema.Types.ObjectId, ref: 'Society', required: true },
  category: { type: String, enum: CATEGORIES, required: true },
  weightKg: {
    type: Number,
    required: true,
    validate: {
      validator: (w) => w > 0 && w <= MAX_CONTRIBUTION_KG,
      message: `weightKg must be > 0 and <= ${MAX_CONTRIBUTION_KG}`,
    },
  },
  loggedAt: { type: Date, default: Date.now },
});

contributionSchema.index({ societyId: 1, category: 1, loggedAt: 1 });
contributionSchema.index({ userId: 1, loggedAt: -1 });

applyToJSON(contributionSchema);

module.exports = mongoose.model('Contribution', contributionSchema);
