const Payment = require('../models/Payment');
const User = require('../models/User');
const MembershipPlan = require('../models/MembershipPlan');

// POST /api/payments/purchase - Create a mock payment (user auth required)
const purchasePlan = async (req, res) => {
  try {
    const { plan_id } = req.body;
    const userId = req.user.userId;

    const plan = await MembershipPlan.findById(plan_id);
    if (!plan) return res.status(404).json({ message: 'Membership plan not found' });

    // Create a payment record
    const payment = await Payment.create({
      user_id: userId,
      plan_id: plan._id,
      payment_status: 'completed',
      payment_date: new Date()
    });

    // Update user's membership and payment status
    await User.findByIdAndUpdate(userId, {
      membership_id: plan._id,
      payment_status: 'active'
    });

    res.status(201).json({ message: 'Payment successful!', payment });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

// GET /api/payments/history - Get all payments (admin only)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate('user_id', 'name email')
      .populate('plan_id', 'plan_name price duration')
      .sort({ createdAt: -1 });

    res.json({ payments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment history', error: error.message });
  }
};

// GET /api/payments/my-payment - Get current user's payment/subscription
const getMyPayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const payment = await Payment.findOne({ user_id: userId })
      .populate('plan_id', 'plan_name price duration description features')
      .sort({ createdAt: -1 });

    res.json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your payment', error: error.message });
  }
};

module.exports = { purchasePlan, getAllPayments, getMyPayment };
