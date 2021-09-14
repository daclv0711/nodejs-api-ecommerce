import mongoose from "mongoose";

const { Schema } = mongoose

const NeweventsSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    collection: 'newEvents'
})

export default mongoose.model('newEvents', NeweventsSchema)