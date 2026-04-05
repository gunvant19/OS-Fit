const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');

router.post('/register', validate(authController.schemas.registerSchema), authController.register);
router.post('/login', validate(authController.schemas.loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
