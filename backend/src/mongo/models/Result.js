import mongoose from 'mongoose';
import {restaurantSchema} from './Restaurant';

const resultSchema = mongoose.Schema({
  sessionID: {
    type: String,
    required: true,
  },
  restaurant: {
    type: [restaurantSchema],
    default: [],
  },
});

export default mongoose.model('Result', resultSchema);

