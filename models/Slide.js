import mongoose from "mongoose";

const { Schema } = mongoose

const SlidesSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: ''
    }
}, {
    collection: 'slides'
})

export default mongoose.model('slides', SlidesSchema)