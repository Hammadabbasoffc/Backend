const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullName:{
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String,
});

module.exports = mongoose.model("Owner", ownerSchema);