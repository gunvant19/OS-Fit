const User = require('../models/User');
const Trainer = require('../models/Trainer');
const MembershipPlan = require('../models/MembershipPlan');
const Payment = require('../models/Payment');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalTrainers = await Trainer.countDocuments();
    const activeMemberships = await User.countDocuments({ payment_status: 'active' });
    
    const recentRegistrations = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');

    const totalRevenue = await Payment.aggregate([
      { $match: { payment_status: 'completed' } },
      { $lookup: { from: 'membershipplans', localField: 'plan_id', foreignField: '_id', as: 'plan' } },
      { $unwind: '$plan' },
      { $group: { _id: null, total: { $sum: '$plan.price' } } }
    ]);

    res.json({
      totalUsers,
      totalTrainers,
      activeMemberships,
      recentRegistrations,
      revenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

module.exports = {
  getDashboardStats
};
