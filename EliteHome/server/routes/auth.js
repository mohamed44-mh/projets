const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const auth = require('../middleware/auth');
const {
  register,
  login,
  logout,
  getUser,
  updateProfile,
} = require('../controllers/authController');

// ─── Multer config for avatar upload ─────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'avatar-' + unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// ─── Validation rules ─────────────────────────────────────────────────────────
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// ─── Routes ───────────────────────────────────────────────────────────────────
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', auth, logout);
router.get('/user', auth, getUser);
router.post('/user/update', auth, upload.any(), updateProfile);

module.exports = router;
