const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');
const { EVENT_TYPES, EVENT_STATUSES, EVENT_CREATOR_ROLES } = require('../config/constants');

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    creatorRole: { type: String, enum: EVENT_CREATOR_ROLES, required: true },
    societyId: { type: Schema.Types.ObjectId, ref: 'Society', default: null }, // null = public NGO event
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: EVENT_TYPES, required: true },
    date: { type: Date, required: true },
    location: { type: String, trim: true },
    description: { type: String, trim: true },
    rsvps: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: EVENT_STATUSES, default: 'active' },
  },
  { timestamps: true }
);

eventSchema.index({ societyId: 1, status: 1, date: 1 });
eventSchema.index({ creatorId: 1, status: 1 });

applyToJSON(eventSchema);

module.exports = mongoose.model('Event', eventSchema);
