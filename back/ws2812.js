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
        for (var i = 0; i < img_data.width * img_data.length; i++)
        {
            var x = (i / 4) % img_data.width;
            var y = Math.floor((i / 4) / img_data.width);
            indexed_image_data[i] = img_data[x][y];
        }
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
  