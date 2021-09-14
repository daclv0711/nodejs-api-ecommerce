import mongoose from "mongoose";

const { Schema } = mongoose

const SearchSpecialsSchema = new Schema({
    img1: {
        type: String,
        required: true
    },
    img2: {
        type: String,
        required: true
    },
    img3: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    bg: {
        type: String,
        required: true
    }
}, {
    collection: 'searchSpecials'
})

export default mongoose.model('searchSpecials', SearchSpecialsSchema)