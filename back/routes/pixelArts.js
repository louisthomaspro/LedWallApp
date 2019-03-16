const express = require('express');
const router = express.Router();
const PixelArts = require('../models/pixelArts');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');

var anim_interval_id = -1;  //Used to stop the currently displayed animation/image

// create
router.post('/', function (req, res, next) {
    const pixelArt = req.body;
    if (!pixelArt) {
        const error = new Error('No data found');
        error.httpStatusCode = 400;
        return next(error);
    }

    const layers = JSON.parse(pixelArt.piskel.layers[0]);
    pixelArt.base64Thumb = layers.base64PNG;

    // add
    delete pixelArt._id;
    let pixelArtRecord = new PixelArts(pixelArt);

    pixelArtRecord.save((err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Pixel art ' + response._id + ' added');
            return res.json(response._id);
        }
    });

});


// update
router.post('/:id', function (req, res, next) {

    const pixelArtId = req.params.id;
    const pixelArt = req.body;

    if (!pixelArt) {
        const error = new Error('No data found');
        error.httpStatusCode = 400;
        return next(error);
    }

    const layers = JSON.parse(pixelArt.piskel.layers[0]);
    pixelArt.base64Thumb = layers.base64PNG;

    PixelArts.updateOne({_id: pixelArtId}, { $set: { modelVersion: pixelArt.modelVersion, base64Thumb: pixelArt.base64Thumb, piskel: pixelArt.piskel } }, function(err, affected, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log('Pixel art ' + pixelArtId + ' updated');
            return res.json(pixelArtId);
        }
    });

});



// delete
router.delete('/:id', function (req, res) {
    const pixelArtId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid pixelArtId");

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
    const pixelArtId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid pixelArtId");

    PixelArts.findOne({_id: pixelArtId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid pixelArtId");

        console.log('Pixel art ' + pixelArtId + ' returned');

        return res.json(response);

    });

});



// get all
router.get('/', (req, res) => {
    PixelArts.find({}, function (err, response) {
        console.log(response.length + ' pixelArts returned');
        return res.json(response);
    });
});



//run
router.get('/run/:id', function (req, res, next) {

    const pixelArtId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(pixelArtId)) res.status(500).send("invalid pixelArtId");

    PixelArts.findOne({_id: pixelArtId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid pixelArtId");

        const piskel = response;

        anim_interval_id = ws2812.WS2812RunEditorImage(piskel, anim_interval_id);

        console.log('PixelArt ' + pixelArtId + ' running');

        const r = {
            message: "Successful run !"
        };
        res.status(200).send(r);

    });
});

module.exports = router;
