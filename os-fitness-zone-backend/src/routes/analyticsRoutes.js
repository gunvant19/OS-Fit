const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Admin only route
router.get('/stats', authenticateToken, authorizeRole('admin'), analyticsController.getDashboardStats);

module.exports = router;
