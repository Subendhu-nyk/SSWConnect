const jwt = require('jsonwebtoken');
const User = require('../models/userProfile/userProfile');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("token>>>>",token,process.env.JWT_SECRET)
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findByPk(decoded.userId);
    console.log("token>>>>",user)
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = { authenticate };
