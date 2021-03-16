import mongoose from 'mongoose';

export const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfVotes: {
    type: Number,
    default: 0,
  },
});