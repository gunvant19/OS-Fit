const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  contact: { type: String, required: true },
  certifications: [{ type: String }],
  availabilitySchedule: { type: String },
  photoURL: { type: String },
  bio: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);
