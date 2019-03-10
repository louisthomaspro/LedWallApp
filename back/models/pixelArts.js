const mongoose = require('mongoose');

let Schema = mongoose.Schema({

    modelVersion: String,
    piskel: [{
        name: String,
        description: String,
        fps: Number,
        height: Number,
        width: Number,
        layers: String
    }]
},
{
    timestamps: true
});


let PixelArts = mongoose.model("pixelArts", Schema);
module.exports = PixelArts;
