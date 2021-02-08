import { Schema, model } from 'mongoose';

const jokeSchema = new Schema({
    type: {
        type: String,
        required: true,
        default: 'joke'
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

export default model('joke', jokeSchema);