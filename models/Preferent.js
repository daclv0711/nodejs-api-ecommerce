import mongoose from "mongoose";

const { Schema } = mongoose

const PreferentSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    collection: 'preferents'
})

export default mongoose.model('preferents', PreferentSchema)