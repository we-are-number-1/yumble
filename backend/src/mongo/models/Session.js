import mongoose from 'mongoose';

import {preferenceSchema} from './Preference';
import {restaurantSchema} from './Restaurant';
// TODO: Jenifer could you look at this change?
// import config from '../../config';

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
  // TODO: Jenifer could you look at this change?
  // createdAt: {type: Date, expires: config.session_expiry, default: Date.now},
});

export default mongoose.model('Session', sessionSchema);
