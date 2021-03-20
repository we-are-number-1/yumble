import mongoose from 'mongoose';

export const coordinatesSchema = mongoose.Schema({
  lat: {
    type: Number,
    default: 0.0,
  },
  lng: {
    type: Number,
    default: 0.0,
  },
});
