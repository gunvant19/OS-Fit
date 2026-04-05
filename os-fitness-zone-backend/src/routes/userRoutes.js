const express = require('express');
const router = express.Router();
const { getAllUsers, getMe, updateMe, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// User: get + update own profile
router.get('/me', authenticateToken, getMe);
router.put('/me', authenticateToken, updateMe);

// Admin: view all users
router.get('/', authenticateToken, authorizeRole('admin'), getAllUsers);

// Admin: update user (assign trainer/plan)
router.put('/:id', authenticateToken, authorizeRole('admin'), updateUser);

// Admin: delete user
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteUser);

module.exports = router;
