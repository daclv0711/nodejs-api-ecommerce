import mongoose from 'mongoose'

const { Schema } = mongoose

const ChatSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    collection: 'chat',
    timestamps: true
})

export default mongoose.model('chat', ChatSchema)