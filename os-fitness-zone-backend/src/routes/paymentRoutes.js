const express = require('express');
const router = express.Router();
const { purchasePlan, getAllPayments, getMyPayment } = require('../controllers/paymentController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// User: purchase a plan (mock payment)
router.post('/purchase', authenticateToken, purchasePlan);

// User: get my own payment
router.get('/my-payment', authenticateToken, getMyPayment);

// Admin: get all payment history
router.get('/history', authenticateToken, authorizeRole('admin'), getAllPayments);

module.exports = router;
