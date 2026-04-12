const express = require('express');
const router = express.Router();
const membershipPlanController = require('../controllers/membershipPlanController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

// Public - no auth required so plans show for everyone (visitors, users, admins)
router.get('/', membershipPlanController.getAllPlans);

// Admin only routes
router.post('/', authenticateToken, authorizeRole('admin'), validate(membershipPlanController.schemas.planSchema), membershipPlanController.createPlan);
router.put('/:id', authenticateToken, authorizeRole('admin'), validate(membershipPlanController.schemas.planSchema), membershipPlanController.updatePlan);
router.delete('/:id', authenticateToken, authorizeRole('admin'), membershipPlanController.deletePlan);

module.exports = router;
