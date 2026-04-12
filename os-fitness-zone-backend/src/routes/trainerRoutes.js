const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

// Public - no auth required so trainers show for everyone (visitors, users, admins)
router.get('/', trainerController.getAllTrainers);

// Admin only routes
router.post('/', authenticateToken, authorizeRole('admin'), validate(trainerController.schemas.trainerSchema), trainerController.createTrainer);
router.put('/:id', authenticateToken, authorizeRole('admin'), validate(trainerController.schemas.trainerSchema), trainerController.updateTrainer);
router.delete('/:id', authenticateToken, authorizeRole('admin'), trainerController.deleteTrainer);

module.exports = router;
