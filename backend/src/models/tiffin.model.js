import mongoose from 'mongoose';

const tiffinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Regular', 'Premium', 'Diet', 'South Indian', 'North Indian', 'Custom'],
    default: 'Regular'
  },

  items: [{
    type: String,
    required: true
  }],

  price: {
    type: Number,
    required: true
  },

  specialToday: {
    type: String,
    default: "No special today"
  },

  image: {
    type: String
  },

  description: {
    type: String
  },

  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Tiffin = mongoose.model('Tiffin', tiffinSchema);

export default Tiffin;
