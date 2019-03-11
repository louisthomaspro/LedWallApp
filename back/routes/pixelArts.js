const express = require('express');
const router = express.Router();
const PixelArts = require('../models/pixelArts');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');




// create/update
router.post('/', function (req, res, next) {
    const pixelart = req.body;
    console.log(pixelart);
    if (!pixelart) {
        const error = new Error('No data found');
        error.httpStatusCode = 400;
        return next(error);
    }

    const layers = JSON.parse(pixelart.piskel.layers[0]);
    pixelart.base64Thumb = layers.base64PNG;


    // add
    if (!pixelart._id) {
        console.log('add');
        delete pixelart._id;
        let pixelArtRecord = new PixelArts(pixelart);

        pixelArtRecord.save((err, response) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(response._id);
            }
        });

    } else { // update

        console.log('update id :' + pixelart._id);
        PixelArts.updateOne({_id: pixelart._id}, { $set: { modelVersion: pixelart.modelVersion, base64Thumb: pixelart.base64Thumb, piskel: pixelart.piskel } }, function(err, affected, resp) {
            if (err) {
                console.log(err);
            } else {
                return res.json(pixelart._id);
            }
        });
    }
});



// delete
router.delete('/', function (req, res) {
    let pixelArtId = req.body.id;

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



//run
router.get('/run/:id', function (req, res, next) {

    let pixelArtId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid id");

    PixelArts.findOne({_id: pixelArtId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid id");

        const piskel = response;

        // appel fonction convertir
        // var img_data = ws2812.WS2812ImageToRgb(path);
        // ecrire dans le fichier
        // ws2812.WS2812DisplayImage(img_data);

        return res.status(200);

    });
});


// get one
router.get('/:id', function (req, res) {
    let pixelArtId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid id");

    PixelArts.findOne({_id: pixelArtId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid id");

        return res.json(response);

    });

});






module.exports = router;
