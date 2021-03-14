import mongoose from 'mongoose';

export const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', UserSchema);
