import mongoose from 'mongoose';

const preferenceSchema = mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
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
