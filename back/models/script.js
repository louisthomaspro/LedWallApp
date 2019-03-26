const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    path: String,
    extension: String,
    filename: String,
    name: String
},
{
    timestamps: true
});


let Script = mongoose.model("Script", Schema);
module.exports = Script;
