const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    name: String,
    animationItems: [{
        time: Number, // seconds
        pixelArt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PixelArts'
        }
    }]
},
{
    timestamps: true
});


let Animations = mongoose.model("Animations", Schema);
module.exports = Animations;
