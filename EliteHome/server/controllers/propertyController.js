const Property = require('../models/Property');
const path = require('path');
const fs = require('fs');

// ─── GET /api/properties/all  (public) ────────────────────────────────────────
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('owner', 'name email avatar')
      .sort({ createdAt: -1 });
    res.json({ data: properties });
  } catch (error) {
    console.error('getAllProperties error:', error);
    res.status(500).json({ message: 'Failed to fetch properties.' });
  }
};

// ─── GET /api/properties  (auth user's own) ───────────────────────────────────
const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ data: properties });
  } catch (error) {
    console.error('getUserProperties error:', error);
    res.status(500).json({ message: 'Failed to fetch your properties.' });
  }
};

const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, type, surface, rooms, bathrooms, status, address } = req.body;

    const parsePrice = (p) => {
      if (typeof p === 'number') return p;
      if (!p) return 0;
      const cleaned = String(p).replace(/[^0-9.]/g, '');
      return parseFloat(cleaned) || 0;
    };

    // Collect uploaded image paths
    const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

    const property = await Property.create({
      title,
      description,
      price: parsePrice(price),
      location,
      type,
      address: (address && address.trim()) ? address : (location || ''),
      surface,
      rooms,
      bathrooms,
      status,
      images,
      owner: req.user._id,
    });

    res.status(201).json({ data: property });
  } catch (error) {
    console.error('createProperty error:', error);
    res.status(500).json({ message: 'Failed to create property.' });
  }
};

// ─── GET /api/properties/:id ──────────────────────────────────────────────────
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email avatar phone');
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }
    res.json({ data: property });
  } catch (error) {
    console.error('getProperty error:', error);
    res.status(500).json({ message: 'Failed to fetch property.' });
  }
};

// ─── POST /api/properties/:id  (_method=PUT → update) ────────────────────────
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // Only owner can update
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this property.' });
    }

    const { title, description, price, location, type, surface, rooms, bathrooms, status, address } = req.body;

    const parsePrice = (p) => {
      if (typeof p === 'number') return p;
      if (!p) return 0;
      const cleaned = String(p).replace(/[^0-9.]/g, '');
      return parseFloat(cleaned) || 0;
    };

    if (title !== undefined) property.title = title;
    if (description !== undefined) property.description = description;
    if (price !== undefined) property.price = parsePrice(price);
    if (location !== undefined) property.location = location;
    if (type !== undefined) property.type = type;
    if (address !== undefined) property.address = address;
    if (surface !== undefined) property.surface = surface;
    if (rooms !== undefined) property.rooms = rooms;
    if (bathrooms !== undefined) property.bathrooms = bathrooms;
    if (status !== undefined) property.status = status;

    // Handle image update:
    // 'existingImages' = paths the client wants to KEEP
    // 'images' = new files uploaded
    const existingImages = req.body.existingImages;
    if (existingImages !== undefined) {
      // Normalize to array (single value comes as string)
      const kept = Array.isArray(existingImages) ? existingImages : [existingImages];
      // Delete files that were removed by user
      property.images.forEach((imgPath) => {
        if (!kept.includes(imgPath)) {
          const fullPath = path.join(__dirname, '..', imgPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }
      });
      property.images = kept;
    }

    // Append newly uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((f) => `/uploads/${f.filename}`);
      property.images = [...property.images, ...newImages];
    }

    await property.save();
    res.json({ data: property });
  } catch (error) {
    console.error('updateProperty error:', error);
    res.status(500).json({ message: 'Failed to update property.' });
  }
};

// ─── DELETE /api/properties/:id ───────────────────────────────────────────────
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // Only owner can delete
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this property.' });
    }

    // Delete associated image files from disk
    property.images.forEach((imgPath) => {
      const fullPath = path.join(__dirname, '..', imgPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await property.deleteOne();
    res.json({ message: 'Property deleted successfully.' });
  } catch (error) {
    console.error('deleteProperty error:', error);
    res.status(500).json({ message: 'Failed to delete property.' });
  }
};

// ─── POST /api/properties/:id/rate ────────────────────────────────────────────
const rateProperty = async (req, res) => {
  try {
    const { score } = req.body;

    if (!score || score < 1 || score > 5) {
      return res.status(422).json({ message: 'Score must be between 1 and 5.' });
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // Remove previous rating from same user, then add new one
    property.ratings = property.ratings.filter(
      (r) => r.user.toString() !== req.user._id.toString()
    );
    property.ratings.push({ user: req.user._id, score });

    await property.save();
    res.json({ data: property });
  } catch (error) {
    console.error('rateProperty error:', error);
    res.status(500).json({ message: 'Failed to rate property.' });
  }
};

module.exports = {
  getAllProperties,
  getUserProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  rateProperty,
};
