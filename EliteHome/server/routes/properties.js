const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const auth = require('../middleware/auth');
const {
  getAllProperties,
  getUserProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  rateProperty,
} = require('../controllers/propertyController');

// ─── Ensure uploads directory exists ─────────────────────────────────────────
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ─── Multer config for property images ───────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'property-' + unique + path.extname(file.originalname));
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per image
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// Public
router.get('/all', getAllProperties);

// Private
router.get('/', auth, getUserProperties);
router.post('/', auth, upload.array('images', 10), createProperty);
router.get('/:id', auth, getProperty);

// Frontend sends POST with _method=PUT for multipart update
router.post('/:id', auth, upload.array('images', 10), updateProperty);
router.delete('/:id', auth, deleteProperty);
router.post('/:id/rate', auth, rateProperty);

module.exports = router;
