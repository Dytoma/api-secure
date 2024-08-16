import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true
    },
    start_date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 'task'
    }
}, {timestamps: true})

export const Task = mongoose.model('Task', taskSchema)
