const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
  },
  time: {
    type: Date,
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
