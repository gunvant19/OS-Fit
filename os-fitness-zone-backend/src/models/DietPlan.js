const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  goal: { type: String, enum: ['weight loss', 'muscle gain', 'maintenance'], required: true },
  breakfast: { type: String },
  lunch: { type: String },
  dinner: { type: String },
  snacks: { type: String },
  notes: { type: String },
  calories: { type: Number },
  dietType: { type: String, enum: ['veg', 'non-veg', 'vegan'] },
  created_by_admin: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', dietPlanSchema);
