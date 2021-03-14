import mongoose from 'mongoose';
import {userSchema} from './User';

// TODO: Add Restaurants, votes and preferences to model
const sessionSchema = mongoose.Schema({
  isFinished: {
    type: Boolean,
    default: false,
  },
  hostId: {
    type: Number,
    required: true,
  },
  users: {
    type: [userSchema],
    default: [],
  },
});

export default mongoose.model('Session', sessionSchema);
