const mongoose = require('mongoose');
const { applyToJSON, locationSchema } = require('./plugins');
const { ROLES, SOCIETY_ROLES, VERIFICATION_STATUSES } = require('../config/constants');

const { Schema } = mongoose;

const ngoSchema = new Schema(
  {
    orgName: String,
    verificationStatus: { type: String, enum: VERIFICATION_STATUSES, default: 'none' },
    documentUrl: String,
    submittedAt: Date,
  },
  { _id: false }
);

const bhangarwalaSchema = new Schema(
  {
    location: { type: locationSchema, default: undefined },
    locationUpdatedAt: Date,
    isOnline: { type: Boolean, default: false },
    vehicleType: String,
    areaNote: String,
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true },
    avatarUrl: String,
    role: { type: String, enum: ROLES, required: true },
    refreshTokenHash: String,

    // person
    societyId: { type: Schema.Types.ObjectId, ref: 'Society' },
    societyRole: { type: String, enum: SOCIETY_ROLES },
    feeCreditPaise: { type: Number, default: 0 },

    // ngo (only present on ngo users)
    ngo: { type: ngoSchema, default: undefined },

    // bhangarwala (only present on bhangarwala users)
    bhangarwala: { type: bhangarwalaSchema, default: undefined },
  },
  { timestamps: true }
);

applyToJSON(userSchema);

module.exports = mongoose.model('User', userSchema);
