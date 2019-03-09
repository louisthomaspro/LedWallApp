const mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: String,
    url: String,
    extension: String
});

var Files = mongoose.model("files", Schema);
module.exports = Files;
