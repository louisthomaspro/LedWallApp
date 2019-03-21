const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    LED_WALL_WIDTH: Number
});


let Parameters = mongoose.model("Parameters", Schema);
module.exports = Parameters;
