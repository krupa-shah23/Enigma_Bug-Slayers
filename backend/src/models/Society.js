const mongoose = require('mongoose');
const { applyToJSON, locationSchema } = require('./plugins');
const { COLLECTION_FREQUENCIES, FESTIVAL_DECISIONS } = require('../config/constants');

const { Schema } = mongoose;

const festivalScheduleSchema = new Schema(
  {
    festivalName: String,
    suggestedDate: Date,
    decision: { type: String, enum: FESTIVAL_DECISIONS, default: 'pending' },
    finalDate: Date,
  },
  { _id: false }
);

const societySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    location: { type: locationSchema, required: true },
    zoneId: String,

    cpId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    treasurerId: { type: Schema.Types.ObjectId, ref: 'User' },

    collectionFrequency: { type: String, enum: COLLECTION_FREQUENCIES, default: 'monthly' },
    lastCollectionDate: Date,
    nextCollectionDate: Date,
    festivalSchedule: { type: festivalScheduleSchema, default: undefined },

    trustScore: { type: Number, default: null, min: 0, max: 100 },
    feeReductionTotalPaise: { type: Number, default: 0 },
    unallocatedPaise: { type: Number, default: 0 },
  },
  { timestamps: true }
);

applyToJSON(societySchema);

module.exports = mongoose.model('Society', societySchema);
