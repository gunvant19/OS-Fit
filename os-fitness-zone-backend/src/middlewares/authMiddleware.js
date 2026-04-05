const jwt = require('jsonwebtoken');

// Generate Tokens
const generateTokens = (user) => {
  const payload = { userId: user._id, role: user.role };
  
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1d' } // 1 day for dev
  );
  
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // 7 days
  );

  return { accessToken, refreshToken };
};

// Middleware: Authenticate Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or Expired Access Token' });
    req.user = decoded;
    next();
  });
};

// Middleware: Authorize Role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient Permissions' });
    }
    next();
  };
};

module.exports = {
  generateTokens,
  authenticateToken,
  authorizeRole,
};
