const express = require('express');
const router = express.Router();

const { auth, optionalAuth } = require('../middleware/auth');
const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/messageController');

// Send a message (optional auth to identify logged in user)
router.post('/', optionalAuth, sendMessage);

// Get all messages (dashboard use)
router.get('/', auth, getMessages);

// Mark a message as read
router.patch('/:id/read', auth, markAsRead);

// Delete a message
router.delete('/:id', auth, deleteMessage);

module.exports = router;
