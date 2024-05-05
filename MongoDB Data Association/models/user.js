const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/dataAssociation')

const userSchema = mongoose.Schema(
    {
        username: String,
        email: String,
        age: Number,
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    }
)

module.exports = mongoose.model("User", userSchema)
