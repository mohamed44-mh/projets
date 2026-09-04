const mongoose = require('mongoose');

const messageLoadingSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
    },
    senderEmail: {
      type: String,
      required: [true, 'Sender email is required'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      default: 'Demande de contact',
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
  { timestamps: true, collection: 'messagesLoding' }
);

module.exports = mongoose.model('MessageLoading', messageLoadingSchema);
