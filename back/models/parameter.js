const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    LED_WALL_WIDTH: Number
});


let Parameter = mongoose.model("Parameter", Schema);
module.exports = Parameter;
