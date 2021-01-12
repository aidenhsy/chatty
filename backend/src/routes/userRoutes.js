const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../util/generateToken');
const { protect } = require('../middleware/authMiddleware');

const Router = express.Router();

Router.route('/login').post(
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: 'Invalid username or password',
      });
    }
  })
);

Router.route('/register').post(
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: 'Something went wrong',
      });
    }
  })
);

Router.route('/profile').get(
  protect,
  asyncHandler((req, res) => {
    const user = req.user;
    res.json(user);
  })
);

Router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
  })
);

Router.route('/').get(
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

module.exports = Router;
