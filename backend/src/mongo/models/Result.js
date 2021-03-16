import mongoose from 'mongoose';
import restaurantSchema from './Restaurant';

const resultSchema = mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  restaurant: {
    type: [restaurantSchema],
    default: [],
  },
});

export default mongoose.model('Result', resultSchema);
