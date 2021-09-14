import mongoose from "mongoose";

const { Schema } = mongoose

const CateSpecialsSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    collection: 'categorySpecials'
})

export default mongoose.model('categorySpecials', CateSpecialsSchema)