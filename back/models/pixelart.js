const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    modelVersion: String,
    base64Thumb: String,
    piskel: {
        name: String,
        description: String,
        fps: Number,
        height: Number,
        width: Number,
        layers: [String]
    }
},
{
    timestamps: true
});


let Pixelart = mongoose.model("Pixelart", Schema);
module.exports = Pixelart;
