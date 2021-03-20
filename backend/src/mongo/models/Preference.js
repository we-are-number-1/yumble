import mongoose from 'mongoose';
import {coordinatesSchema} from './Coordinates';

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
  timer: {
    type: Number,
    default: 0,
  },
  coordinates: {
    type: coordinatesSchema,
    default: {
      lat: 0.0,
      lon: 0.0,
    },
  },
});

export default mongoose.model('Preference', preferenceSchema);
