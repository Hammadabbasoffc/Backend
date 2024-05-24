const mongoose = require('mongoose');
const debug = require("debug")("development:mongoose ");

mongoose.connect("mongodb://localhost:27017/scatchApp")
.then(()=>debug("Connected"))
.catch((err)=>debug(err));

module.exports = mongoose.connection;
