const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, error: 'Email already exists' });

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true, data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error', details: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true, data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error', details: err.message });
  }
};
