import mongoose from 'mongoose'

const { Schema } = mongoose

const AuthSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    imgUser: {
        type: String,
        default: ''
    },
    role: {
        type: Number,
        default: 1,
        required: true
    }
}, {
    timestamps: true,
    collection: 'auth'
})

const Auth = mongoose.model('auth', AuthSchema)



export default Auth