import mongoose from 'mongoose';

export const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
