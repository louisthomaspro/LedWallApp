
const mongoose = require('mongoose');

 var Schema =mongoose.Schema({
    nname: String,
    imgUrl:String,
    price: Number
});

var Products = mongoose.model("products",Schema);
module.exports = Products;