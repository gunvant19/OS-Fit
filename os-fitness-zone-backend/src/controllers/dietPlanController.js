const DietPlan = require('../models/DietPlan');
const { z } = require('zod');

const dietSchema = z.object({
  body: z.object({
    user_id: z.string(),
    title: z.string().min(2),
    description: z.string().optional(),
    goal: z.enum(['weight loss', 'muscle gain', 'maintenance']),
    breakfast: z.string().optional(),
    lunch: z.string().optional(),
    dinner: z.string().optional(),
    snacks: z.string().optional(),
    notes: z.string().optional(),
    calories: z.number().optional(),
    dietType: z.enum(['veg', 'non-veg', 'vegan']).optional(),
    created_by_admin: z.boolean().optional()
  })
});

const getAllDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find().populate('user_id', 'name email');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diet plans', error: error.message });
  }
};

const getUserDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findOne({ user_id: req.user.userId }).sort({ createdAt: -1 });
    if (!plan) return res.status(404).json({ message: 'No diet plan found for this user' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user diet plan', error: error.message });
  }
};

const createDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating diet plan', error: error.message });
  }
};

const updateDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plan) return res.status(404).json({ message: 'Diet plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating diet plan', error: error.message });
  }
};

const deleteDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Diet plan not found' });
    res.json({ message: 'Diet plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting diet plan', error: error.message });
  }
};

module.exports = {
  getAllDietPlans,
  getUserDietPlan,
  createDietPlan,
  updateDietPlan,
  deleteDietPlan,
  schemas: { dietSchema }
};
