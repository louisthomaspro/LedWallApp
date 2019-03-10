const express = require('express');
const router = express.Router();
const PixelArts = require('../models/pixelArts');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});




// upload
router.post('/', function (req, res, next) {
    const pixelart = req.body;
    console.log(pixelart);
    if (!pixelart) {
        const error = new Error('No data found');
        error.httpStatusCode = 400;
        return next(error);
    }

    let pixelArtRecord = new PixelArts(pixelart);

    pixelArtRecord.save((err, response) => {
        if (err) {
            console.log(err);
        } else {
            return res.json("Successful upload !");
        }
    });
});


// delete
router.delete('/', function (req, res) {
    const pixelArtId = req.body.id;

    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid id");

    PixelArts.deleteOne({_id: pixelArtId}, function (err) {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Successful delete !",
            id: pixelArtId
        };
        res.status(200).send(response);
    });

});


// get all
router.get('/', (req, res) => {
    PixelArts.find({}, function (err, response) {
        console.log(response);
        return res.json(response);
    });
});



//show file (deprecated)
// router.get('/get/:name', function (req, res, next) {
//
//     var options = {
//         root: process.env.PWD + '/public/files/',
//         dotfiles: 'deny',
//         headers: {
//             'x-timestamp': Date.now(),
//             'x-sent': true
//         }
//     };
//
//     var fileName = req.params.name;
//     res.sendFile(fileName, options, function (err) {
//         if (err) {
//             next(err);
//         } else {
//             console.log('Sent:', fileName);
//         }
//     });
//
// });


//show file
router.post('/run', function (req, res, next) {

    const pixelArtId = req.body.id;

    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid id");

    PixelArts.findOne({_id: pixelArtId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid id");

        console.log(response);

        const path = process.env.PWD + '/' + response.path;

        // appel fonction convertir
        var img_data = ws2812.WS2812ImageToRgb(path);
        // ecrire dans le fichier
        ws2812.WS2812DisplayImage(img_data);

        return res.status(200).send("A bien marché !!");

    });



});


module.exports = router;
