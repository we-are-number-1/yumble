import mongoose from 'mongoose';
import { userSchema } from './User';

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
