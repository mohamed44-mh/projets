const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// ─── Generate JWT ──────────────────────────────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const bcrypt = require('bcryptjs');

// ─── POST /api/register ───────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    // Check if email already used
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(422).json({ message: 'Email déjà utilisé.' });
    }

    const user = await User.create({ name: name.trim(), email: cleanEmail, password: password.trim() });
    const token = generateToken(user._id);

    res.status(201).json({
      access_token: token,
      token_type: 'Bearer',
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Échec de l\'inscription.' });
  }
};

// ─── POST /api/login ──────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = generateToken(user._id);

    res.json({
      access_token: token,
      token_type: 'Bearer',
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Échec de la connexion.' });
  }
};

// ─── POST /api/logout ─────────────────────────────────────────────────────────
// JWT is stateless — client drops the token. We just confirm here.
const logout = async (req, res) => {
  res.json({ message: 'Déconnexion réussie.' });
};

// ─── GET /api/user ────────────────────────────────────────────────────────────
const getUser = async (req, res) => {
  res.json(req.user.toSafeObject ? req.user.toSafeObject() : req.user);
};

// ─── POST /api/user/update ────────────────────────────────────────────────────
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, phone_number, password, remove_photo } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (name) user.name = name.trim();

    if (email && email.toLowerCase().trim() !== user.email) {
      const cleanEmail = email.toLowerCase().trim();
      const existing = await User.findOne({ email: cleanEmail });
      if (existing && existing._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Cet e-mail est déjà utilisé par un autre compte.' });
      }
      user.email = cleanEmail;
    }

    const newPhone = phone_number !== undefined ? phone_number : phone;
    if (newPhone !== undefined) {
      user.phone = newPhone;
    }

    if (password && String(password).trim().length >= 6) {
      const cleanPassword = String(password).trim();
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(cleanPassword, salt);
    }

    // Handle photo removal
    if (remove_photo == 1 || remove_photo === 'true' || remove_photo === true) {
      if (user.avatar) {
        const fullPath = path.join(__dirname, '..', user.avatar);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      }
      user.avatar = null;
    }

    // Handle photo upload (single file via req.file or from req.files)
    const file = req.file || (req.files && req.files[0]);
    if (file) {
      user.avatar = `/uploads/${file.filename}`;
    }

    await user.save();

    res.json({
      message: 'Profil mis à jour avec succès.',
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message || 'Échec de la mise à jour du profil.' });
  }
};

module.exports = { register, login, logout, getUser, updateProfile };
