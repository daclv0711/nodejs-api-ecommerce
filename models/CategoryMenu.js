import mongoose from "mongoose";

const { Schema } = mongoose

const CategorySchema = new Schema({
    item: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    detail: {
        type: Array,
        required: true
    }
}, {
    collection: 'categoryMenu'
})

export default mongoose.model('categoryMenu', CategorySchema)