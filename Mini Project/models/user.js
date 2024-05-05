const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blogapp')

const userSchema = mongoose.Schema(
    {
        username: String,
        name: String,
        age: Number,
        email: String,
        password: String
    }
);

module.exports = mongoose.model("User", userSchema)