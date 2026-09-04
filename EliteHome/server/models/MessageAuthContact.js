const mongoose = require('mongoose');

const messageAuthContactSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    senderName: {
      type: String,
      trim: true,
    },
    senderEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    feedback_type: {
      type: String,
      required: [true, 'Feedback type is required'], // "J'aime" or "Je n'aime pas"
      trim: true,
    },
    body: {
      type: String,
      required: [true, 'Message body is required'],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: 'messagesAuthContact' }
);

module.exports = mongoose.model('MessageAuthContact', messageAuthContactSchema);
