import{ Schema, model } from 'mongoose';

const answerSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
});

const riddleSchema = new Schema({
    type: {
        type: String,
        required: true,
        default: 'riddle'
    },
    content: {
        type: String,
        required: true,
    },
    answers: {
        type: [answerSchema],
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    explanation: {
        type: String,
        required: false
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

export default model('Riddle', riddleSchema);