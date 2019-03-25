const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    name: String,
    animationItems: [{
        time: Number, // seconds
        pixelart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pixelart'
        }
    }]
},
{
    timestamps: true
});


let Animation = mongoose.model("Animation", Schema);
module.exports = Animation;
