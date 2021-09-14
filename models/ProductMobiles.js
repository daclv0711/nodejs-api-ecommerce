import mongoose from "mongoose";

const { Schema } = mongoose

const MobileSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    sale_off: {
        type: Number,
        required: true
    },
    price_old: {
        type: Number,
        required: true
    },
    chip: {
        type: String,
        required: true
    },
    camera: Array,
    desc: Array,
    screen: {
        type: Number,
        required: true
    },
    ram: {
        type: Number,
        required: true
    },
    rom: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    pin_capacity: {
        type: Number,
        required: true
    },
    accessories: Array
}, {
    collection: 'productMobiles'
})

export default mongoose.model('productMobiles', MobileSchema)