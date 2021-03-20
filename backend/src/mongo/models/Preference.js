import mongoose from 'mongoose';

export const preferenceSchema = mongoose.Schema({
  location: {
    type: String,
    default: '',
  },
  distance: {
    type: Number,
    default: 0,
  },
  cuisines: {
    type: [String],
    default: [],
  },
  price: {
    type: [Number],
    default: [5, 15],
  },
});

export default mongoose.model('Preference', preferenceSchema);
