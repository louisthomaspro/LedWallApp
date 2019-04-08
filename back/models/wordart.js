const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    text: String,
    textColor: String,
    bgColor: String
    // bgPixelArt: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Pixelart'
    // }
},
{
    timestamps: true
});


let Wordart = mongoose.model("Wordart", Schema);
module.exports = Wordart;
