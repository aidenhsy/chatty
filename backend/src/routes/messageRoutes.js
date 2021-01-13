const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Message = require('../models/Message');

const Router = express.Router();

Router.route('/send').post(
  asyncHandler(async (req, res) => {
    const { sender, receiver, message } = req.body;
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      time: new Date(),
    });
    res.status(200).json({
      status: true,
      message: newMessage,
    });
  })
);

Router.route('/').post(
  asyncHandler(async (req, res) => {
    const { sender, receiver } = req.body;
    console.log(req.body);
    const user = await User.findOne({ _id: sender });
    const user2 = await User.findOne({ _id: receiver });
    let sentMessages = await Message.find({ sender, receiver })
      .populate('sender', '_id username')
      .populate('receiver', '_id username');
    let receivedMessages = await Message.find({
      sender: receiver,
      receiver: sender,
    })
      .populate('receiver', '_id username')
      .populate('sender', '_id username');
    let messages = sentMessages.concat(receivedMessages);
    messages.sort((a, b) => a.time.getTime() - b.time.getTime());
    res.status(200).json({
      sender: user,
      receiver: user2,
      messages,
    });
  })
);

module.exports = Router;
