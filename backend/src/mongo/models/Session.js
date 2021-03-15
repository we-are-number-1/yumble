import mongoose from 'mongoose';
import { userSchema } from './User';

const sessionSchema = mongoose.Schema({
  isFinished: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Session', sessionSchema);
