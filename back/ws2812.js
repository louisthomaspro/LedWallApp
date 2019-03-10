const jpegjs = require('jpeg-js');
const fs = require('fs');

module.exports = {
    WS2812ImageToRgb: function(img_path)
    {
        var jpeg_data = fs.readFileSync(img_path);      //File read
        var raw_image_data = jpegjs.decode(jpeg_data);    
        return raw_image_data.data;                     //We only need the data buffer
    },
    WS2812JSONToRgb: function(json_obj)
    {
        var img_data = JSON.parse(json_obj);
        return img_data.color_data;                     //We only need the data buffer
    },
    WS2812DisplayImage: function(img_data)
    {
        fs.writeFile("ws2812driver", img_data.toString(), function(err) {
            if (err) {
                return console.log(err);
            }
        })
    }
};
  