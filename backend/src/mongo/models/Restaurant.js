import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cuisine: {
    type: [String],
    default: [],
  },
  price: {
    type: [Number],
    default: [5, 15],
  },
  numberOfVotes: {
    type: Number,
    default: 0,
  },
});

module.exports.restaurantSchema = restaurantSchema;
export default mongoose.model('Restaurant', restaurantSchema);
