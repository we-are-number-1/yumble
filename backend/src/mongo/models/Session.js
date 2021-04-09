import mongoose from 'mongoose';

import {preferenceSchema} from './Preference';
import {restaurantSchema} from './Restaurant';

import config from '../../config';

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
  createdAt: {type: Date, expires: config, default: Date.now},
});

export default mongoose.model('Session', sessionSchema);
