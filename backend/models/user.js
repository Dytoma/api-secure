import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)
