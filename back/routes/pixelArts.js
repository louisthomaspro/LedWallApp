const express = require('express');
const router = express.Router();
const PixelArts = require('../models/pixelArts');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');




// create/update
router.post('/', function (req, res, next) {
    const pixelart = req.body;
    if (!pixelart) {
        const error = new Error('No data found');
        error.httpStatusCode = 400;
        return next(error);
    }

    const layers = JSON.parse(pixelart.piskel.layers[0]);
    pixelart.base64Thumb = layers.base64PNG;


    // add
    if (!pixelart._id) {
        delete pixelart._id;
        let pixelArtRecord = new PixelArts(pixelart);

        pixelArtRecord.save((err, response) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Pixel art ' + response._id + ' added');
                return res.json(response._id);
            }
        });

    } else { // update

        PixelArts.updateOne({_id: pixelart._id}, { $set: { modelVersion: pixelart.modelVersion, base64Thumb: pixelart.base64Thumb, piskel: pixelart.piskel } }, function(err, affected, resp) {
            if (err) {
                console.log(err);
            } else {
                console.log('Pixel art ' + pixelart._id + ' updated');
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

        console.log('Pixel art ' + pixelArtId + ' deleted');
        const response = {
            message: "Successful delete !",
            id: pixelArtId
        };
        res.status(200).send(response);
    });

});



// get one
router.get('/:id', function (req, res) {
    let pixelArtId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid id");

    PixelArts.findOne({_id: pixelArtId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid id");

        console.log('Pixel art ' + pixelArtId + ' returned');

        return res.json(response);

    });

});



// get all
router.get('/', (req, res) => {
    PixelArts.find({}, function (err, response) {
        console.log(response.length + ' pixels art returned');
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

        ws2812.WS2812RunEditorImage(piskel);

        console.log('Pixel art ' + pixelArtId + ' running');

        const r = {
            message: "Successful run !"
        };
        res.status(200).send(r);

    });
});







module.exports = router;
