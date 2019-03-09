
const mongoose = require('mongoose');

 var Schema =mongoose.Schema({
    fname: String,
    lname: String,
    email:String,
    password:String
});

var Users = mongoose.model("users",Schema);
module.exports = Users;