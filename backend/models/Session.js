import mongoose from 'mongoose';
import {UserSchema} from './User';

// TODO: Add Restaurants, votes and preferences to model
const SessionSchema = mongoose.Schema({
  isFinished: {
    type: Boolean,
    default: false,
  },
  hostId: {
    type: Number,
    required: true,
  },
  users: {
    type: [UserSchema],
    default: [],
  },
});

export default mongoose.model('Session', SessionSchema);
