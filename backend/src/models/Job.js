const mongoose = require('mongoose');
const { applyToJSON } = require('./plugins');
const { JOB_STATUSES } = require('../services/jobState');

const { Schema } = mongoose;

const historySchema = new Schema(
  {
    status: { type: String, enum: JOB_STATUSES, required: true },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const jobSchema = new Schema(
  {
    // unique: one job per request (backs the select-quote race guarantee)
    requestId: { type: Schema.Types.ObjectId, ref: 'P2PRequest', required: true, unique: true },
    quoteId: { type: Schema.Types.ObjectId, ref: 'Quote', required: true },
    personId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bhangarwalaId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true, min: 0 },
    status: { type: String, enum: JOB_STATUSES, default: 'assigned' },
    statusHistory: { type: [historySchema], default: [] },
    completedAt: Date,
  },
  { timestamps: true }
);

jobSchema.index({ bhangarwalaId: 1, status: 1 });
jobSchema.index({ personId: 1, status: 1 });

// A new job starts with its 'assigned' entry so history is complete (5 steps in total).
jobSchema.pre('validate', function seedHistory(next) {
  if (this.isNew && this.statusHistory.length === 0) {
    this.statusHistory.push({ status: this.status, at: new Date() });
  }
  next();
});

applyToJSON(jobSchema);

module.exports = mongoose.model('Job', jobSchema);
