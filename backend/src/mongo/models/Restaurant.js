import mongoose from 'mongoose';
import {coordinatesSchema} from './Coordinates';

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  numberOfVotes: {
    type: Number,
    default: 0,
  },
  coords: {
    type: coordinatesSchema,
    default: {
      lat: 0.0,
      lng: 0.0,
    },
  },
  price: {
    type: String,
    default: '$',
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: {
    type: String,
    default: '',
  },
});

module.exports.restaurantSchema = restaurantSchema;
export default mongoose.model('Restaurant', restaurantSchema);
