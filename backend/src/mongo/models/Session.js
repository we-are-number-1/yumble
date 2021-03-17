import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    isFinished: {
        type: Boolean,
        default: false,
    },  
});

export default mongoose.model('Session', sessionSchema);

