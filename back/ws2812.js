const jpegjs = require('jpeg-js');
const PNG = require('pngjs').PNG;
const fs = require('fs');

const DATA_URL_HEADER_OFFSET = 21;
const LED_WALL_WIDTH = 16;
const LED_WALL_HEIGHT = 10;

/*  This functions trims the data URL informations before the actual data we need 
    returns: trimmed base64 data of the image file
*/
function Base64ExtractPNG(data_url)
{
    return data_url.substring(DATA_URL_HEADER_OFFSET);
}

module.exports = {
    WS2812JPEGToRgb: function(img_path)
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
        var bin_data = new Buffer.from(img_data, 'binary');
        fs.writeFile("ws2812driver", bin_data, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    },
    WS2812RunEditorImage: function(json_obj, old_interval_id)
    {
        var frame_counter = 0;
        var frame_base64PNG = JSON.parse(json_obj.piskel.layers[0]).base64PNG;
        var frame_number = JSON.parse(json_obj.piskel.layers[0]).frameCount;
        var frame_delay = (1 / json_obj.piskel.fps) * 1000;                      //In milliseconds

        var frame_PNGbuffer = Buffer.from(Base64ExtractPNG(frame_base64PNG), 'base64');

        if (old_interval_id != -1)
        {
            console.log("Killed old animation");
            clearInterval(old_interval_id);
        }

        var interval_id = setInterval(function() 
        { 
            var frame_RGB = [];
            if (frame_counter < frame_number)
            {
                var png_file = new PNG({ filterType:4 }).parse(frame_PNGbuffer, function(error, data)
                {
                    if (data.width > LED_WALL_WIDTH)    //That's an animation
                    {
                        // console.log("animation");
                        // console.log(frame_counter);
                        // console.log(LED_WALL_WIDTH * frame_counter);
                        // console.log(LED_WALL_WIDTH * (frame_counter + 1));
                        for (var y = 0; y < data.height; y++) 
                        {
                            /* We scroll through the animation images. Indeed, animations are stored in a single PNG.        */
                            /* Thus, a 4 frame animation will be stored as a 64*10 image, while a two frame one in a 32 * 10 */
                            /* Rather straightforward.                                                                       */
                            for (var x = LED_WALL_WIDTH * frame_counter; x < LED_WALL_WIDTH * (frame_counter + 1); x++)
                            {
                                var idx = (data.width * y + x) << 2;  //1D array to 2D coordinates, very important formula!
                                frame_RGB.push(data.data[idx]);       //R
                                frame_RGB.push(data.data[idx + 1]);   //G
                                frame_RGB.push(data.data[idx + 2]);   //B
                            }
                        }   
                    }
                    else 
                    {
                        for (var y = 0; y < data.height; y++) 
                        {
                            for (var x = 0; x < data.width; x++) 
                            {
                                var idx = (data.width * y + x) << 2;  //1D array to 2D coordinates, very important formula!
                                frame_RGB.push(data.data[idx]);       //R
                                frame_RGB.push(data.data[idx + 1]);   //G
                                frame_RGB.push(data.data[idx + 2]);   //B
                            }
                        }   
                    }
                    //console.log(frame_RGB);
                    module.exports.WS2812DisplayImage(frame_RGB);
                    frame_counter += 1;
                });
            } else {
                frame_counter = 0;
            }
        }, frame_delay);

        return interval_id; 
    }
};
