const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/scatchApp");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  passowrd: String,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("User", userSchema);
