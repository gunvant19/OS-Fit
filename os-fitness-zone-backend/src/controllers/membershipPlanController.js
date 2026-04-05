const MembershipPlan = require('../models/MembershipPlan');
const { z } = require('zod');

const planSchema = z.object({
  body: z.object({
    plan_name: z.string().min(2),
    description: z.string().min(2),
    duration: z.enum(['monthly', 'quarterly', 'yearly']),
    price: z.number().min(0),
    features: z.array(z.string()).optional(),
    isActive: z.boolean().optional()
  })
});

const getAllPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find();
    res.json(plans);
  } catch (error) {
    console.error('[getAllPlans] Error:', error);
    res.status(500).json({ message: 'Error fetching membership plans', error: error.message });
  }
};

const createPlan = async (req, res) => {
  try {
    console.log('[createPlan] Received body:', req.body);
    const plan = await MembershipPlan.create(req.body);
    console.log('[createPlan] Success:', plan._id);
    res.status(201).json(plan);
  } catch (error) {
    console.error('[createPlan] Error:', error);
    res.status(500).json({ message: 'Error creating membership plan', error: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('[updatePlan] ID:', id);
    
    // Sanitize body: remove sensitive or read-only fields
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    console.log('[updatePlan] Filtered Body:', JSON.stringify(updateData, null, 2));

    const plan = await MembershipPlan.findById(id);
    if (!plan) {
      console.warn('[updatePlan] Plan not found:', id);
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Apply updates
    Object.assign(plan, updateData);
    
    // Explicitly validate before save
    const validationError = plan.validateSync();
    if (validationError) {
      console.error('[updatePlan] Mongoose Validation Error:', validationError);
      return res.status(400).json({ message: 'Validation failed', errors: validationError.errors });
    }

    await plan.save();
    console.log('[updatePlan] Success:', plan._id);
    res.json(plan);
  } catch (error) {
    console.error('[updatePlan] EXCEPTION:', error);
    res.status(500).json({ 
      message: error.message || 'Error updating membership plan', 
      error: error.message,
      stack: error.stack
    });
  }
};

const deletePlan = async (req, res) => {
  try {
    console.log('[deletePlan] ID:', req.params.id);
    const plan = await MembershipPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    console.log('[deletePlan] Success');
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('[deletePlan] Error:', error);
    res.status(500).json({ message: 'Error deleting membership plan', error: error.message });
  }
};

module.exports = {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
  schemas: { planSchema }
};
