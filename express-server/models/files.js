const mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: String,
    filename: String,
    path: String,
    url: String,
    mimetype: String
});

var Files = mongoose.model("files", Schema);
module.exports = Files;
