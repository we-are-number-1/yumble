import mongoose from 'mongoose';
import Restaurant from './Restaurant';

const resultSchema = mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  restaurant: {
    type: [Restaurant],
    default: [],
  },
});

export default mongoose.model('Result', resultSchema);
