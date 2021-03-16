import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfVotes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Restaurant', restaurantSchema);
