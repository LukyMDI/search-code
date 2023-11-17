const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        trim: true,
    },
    productName: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("products", productSchema);
