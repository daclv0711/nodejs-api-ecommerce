import mongoose from "mongoose";

const { Schema } = mongoose

const PreferentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    product: Array
}, {
    collection: 'productSuggest'
})

export default mongoose.model('productSuggest', PreferentSchema)