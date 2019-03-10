
const mongoose = require('mongoose');

let Schema =mongoose.Schema({
    fname: String,
    lname: String,
    email:String,
    password:String
});

let Users = mongoose.model("users",Schema);
module.exports = Users;
