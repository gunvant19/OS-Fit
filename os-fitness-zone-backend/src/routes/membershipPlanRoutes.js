const express = require('express');
const router = express.Router();
const membershipPlanController = require('../controllers/membershipPlanController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

// Public to all authenticated users
router.get('/', authenticateToken, membershipPlanController.getAllPlans);

// Admin only routes
router.post('/', authenticateToken, authorizeRole('admin'), validate(membershipPlanController.schemas.planSchema), membershipPlanController.createPlan);
router.put('/:id', authenticateToken, authorizeRole('admin'), validate(membershipPlanController.schemas.planSchema), membershipPlanController.updatePlan);
router.delete('/:id', authenticateToken, authorizeRole('admin'), membershipPlanController.deletePlan);

module.exports = router;
