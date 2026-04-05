const { z } = require('zod');
const User = require('../models/User');
const { generateTokens } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

// validation schemas
const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
});

// Controllers
const ADMIN_EMAIL = 'gunvantpatil2335@gmail.com';

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already in use' });

    // Hardcoded admin email gets admin role automatically
    const role = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user';

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const { accessToken, refreshToken } = generateTokens(user);
    
    // Save RT to user
    user.refreshToken = refreshToken;
    await user.save();

    // Set RT in httpOnly cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ message: 'Forbidden' });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err || user._id.toString() !== decoded.userId) return res.status(403).json({ message: 'Forbidden' });
      
      const { accessToken } = generateTokens(user);
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Refresh token failed', error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    
    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    
    if (user) {
      user.refreshToken = '';
      await user.save();
    }
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'Strict', secure: process.env.NODE_ENV === 'production' });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  schemas: { registerSchema, loginSchema }
};
