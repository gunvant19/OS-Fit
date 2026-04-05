const express = require('express');
const router = express.Router();
const dietPlanController = require('../controllers/dietPlanController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

// Public to all authenticated users
router.get('/', authenticateToken, dietPlanController.getAllDietPlans);
router.get('/my-plan', authenticateToken, dietPlanController.getUserDietPlan);

// Admin only routes
router.post('/', authenticateToken, authorizeRole('admin'), validate(dietPlanController.schemas.dietSchema), dietPlanController.createDietPlan);
router.put('/:id', authenticateToken, authorizeRole('admin'), validate(dietPlanController.schemas.dietSchema), dietPlanController.updateDietPlan);
router.delete('/:id', authenticateToken, authorizeRole('admin'), dietPlanController.deleteDietPlan);

module.exports = router;
