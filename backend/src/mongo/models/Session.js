import mongoose from 'mongoose';

import {preferenceSchema} from './Preference';
import {restaurantSchema} from './Restaurant';

const sessionSchema = mongoose.Schema({
  truncCode: {
    type: String,
    default: '',
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  preferences: {
    type: preferenceSchema,
    required: true,
  },
  results: {
    type: [restaurantSchema],
    required: true,
  },
});

export default mongoose.model('Session', sessionSchema);
