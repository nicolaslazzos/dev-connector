const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth/
// @desc    test route
// @access  public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch(error) { 
    console.error(error.message);
    res.status(500).send('Internal server error')
  }
});

// @route   POST api/auth/
// @desc    authenticate user and get token
// @access  public
router.post('/', [
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // bad request
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const payload = {
      user: {
        id: user.id // its the _id in mongo
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;