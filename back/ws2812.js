const jpegjs = require('jpeg-js');
const PNG = require('pngjs').PNG;
const fs = require('fs');
var http = require("http");

var DATA_URL_HEADER_OFFSET = 21;

function Base64ExtractPNG(data_url)
{
    return data_url.substring(DATA_URL_HEADER_OFFSET);
}

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
        // for (var i = 0; i < img_data.width * img_data.length; i++)
        // {
        //     var x = (i / 4) % img_data.width;
        //     var y = Math.floor((i / 4) / img_data.width);
        //     indexed_image_data[i] = img_data[x][y];
        // }
        return img_data.color_data;                     //We only need the data buffer
    },
    WS2812DisplayImage: function(img_data)
    {
        fs.writeFile("ws2812driver", img_data.toString(), function(err) {
            if (err) {
                return console.log(err);
            }
        })
    },
    WS2812RunEditorImage: function(json_obj)
    {
        var frame_RGB = [];
        var indexed_frame_RGB = [];
        var frame_base64PNG = JSON.parse(json_obj.piskel.layers[0]).base64PNG;
        var frame_number = JSON.parse(json_obj.piskel.layers[0]).length;
        var frame_delay = Math.floor(1 / json_obj.piskel.fps);                      //In seconds
        
        var frame_PNGbuffer = Buffer.from(Base64ExtractPNG(frame_base64PNG), 'base64');
        //console.log(frame_PNGbuffer);
        var png_file = new PNG({ filterType:4 }).parse(frame_PNGbuffer, function(error, data)
        {
            for (var y = 0; y < data.height; y++) 
            {
                for (var x = 0; x < data.width; x++) 
                {
                    var idx = (data.width * y + x) << 2;    //1D array to 2D coordinates, very important formula!
                    frame_RGB.push(data.data[idx]);       //R
                    frame_RGB.push(data.data[idx + 1]);   //G
                    frame_RGB.push(data.data[idx + 2]);   //B
                }
            }   
            //console.log(frame_RGB);
            module.exports.WS2812DisplayImage(frame_RGB);
        });
    }
};
  