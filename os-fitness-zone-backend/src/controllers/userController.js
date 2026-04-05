const User = require('../models/User');

// GET /api/users - Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const { search, role, membership } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) query.role = role;
    if (membership) query.membership_id = membership;

    const users = await User.find(query)
      .populate('membership_id', 'plan_name price duration')
      .populate('trainer_id', 'name specialization')
      .select('-password -refreshToken')
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// GET /api/users/me - Get current user's profile
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('membership_id', 'plan_name price duration description features')
      .populate('trainer_id', 'name specialization contact bio')
      .select('-password -refreshToken');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

// PUT /api/users/me - Update current user's profile
const updateMe = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

// PUT /api/users/:id - Update user (Admin Only)
const updateUser = async (req, res) => {
  try {
    const { trainer_id, membership_id, role, payment_status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { trainer_id, membership_id, role, payment_status },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// DELETE /api/users/:id - Delete user (Admin Only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

module.exports = { getAllUsers, getMe, updateMe, updateUser, deleteUser };
