
const mongoose = require('mongoose');

let Schema =mongoose.Schema({
    fname: String,
    lname: String,
    email:String,
    password:String
});

let User = mongoose.model("User",Schema);
module.exports = User;
