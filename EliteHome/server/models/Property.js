const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
});

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    type: {
      type: String,
      default: 'appartement',
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      default: '',
      trim: true,
    },
    surface: {
      type: Number,
      default: 0,
    },
    rooms: {
      type: Number,
      default: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: 'vente',
      lowercase: true,
      trim: true,
    },
    images: [
      {
        type: String, // relative path like /uploads/filename.jpg
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ratings: [ratingSchema],
  },
  { timestamps: true }
);

// Virtual: average rating
propertySchema.virtual('averageRating').get(function () {
  if (!this.ratings || this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, r) => acc + r.score, 0);
  return Math.round((sum / this.ratings.length) * 10) / 10;
});

propertySchema.set('toJSON', { virtuals: true });
propertySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Property', propertySchema);
