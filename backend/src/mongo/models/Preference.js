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
    type: Number,
    default: 0,
  },
  timer: {
    type: Number,
    default: 0,
  },
  coordinates: {
    type: coordinatesSchema,
    default: {
      lat: 0.0,
      lng: 0.0,
    },
  },
  timer: {
    type: Number,
    default: 0,
  },
  coordinates: {
    type: coordinatesSchema,
    default: {
      lat: 0.0,
      lng: 0.0,
    },
  },
});

export default mongoose.model('Preference', preferenceSchema);
