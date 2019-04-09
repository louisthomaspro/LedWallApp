const express = require('express');
const router = express.Router();
const Pixelart = require('../models/pixelart');
const Animations = require('../models/animation');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');

const objectName = 'Pixelart';
const objectType = Pixelart;

function LWClearIntervals()
{
    if (python_process != null) {
        python_process.kill('SIGINT');
    }
    clearInterval(anim_interval_id);  //Used to stop the currently displayed animation/image
    clearInterval(oldplaylist_interval_id);
    clearInterval(playlist_interval_id);
    ws2812.WS2812Clear();
}

// create
router.post('/', function (req, res, next) {
    const object = req.body;
    if (!object) {
        const err = new Error('No data found');
        err.statusCode = 400;
        return next(err);
    }

    // init thumb
    const layers = JSON.parse(object.piskel.layers[0]);
    object.base64Thumb = layers.base64PNG;

    delete object._id;

    let record = new objectType(object);
    record.save((err, response) => {
        if (err) return next(err);
        console.log('Object ' + objectName + ' ' + response._id + ' added');
        return res.json(response._id);
    });
});


// update
router.post('/:id', function (req, res, next) {
    const objectId = req.params.id;
    const object = req.body;
    if (!object) {
        const err = new Error('No data found');
        err.httpStatusCode = 400;
        return next(err);
    }
    if(!mongoose.Types.ObjectId.isValid(objectId)) return next(new Error("invalid id"));

    // init thumb
    const layers = JSON.parse(object.piskel.layers[0]);
    object.base64Thumb = layers.base64PNG;

    objectType.updateOne({_id: objectId}, { $set: {
        modelVersion: object.modelVersion,
        base64Thumb: object.base64Thumb,
        piskel: object.piskel
    } }, function(err) {
        if (err) return next(err);
        console.log('Object ' + objectName + ' ' + objectId + ' updated');
        return res.json(objectId);
    });
});


// delete
router.delete('/:id', function (req, res, next) {
    const objectId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(objectId)) return next(new Error("invalid id"));
    Animations.update(
        { animationItems: { $elemMatch: { pixelart: objectId } } },
        { $pull: { animationItems: { pixelart: objectId } } },
        { multi: true }, function(err1) {
            if (err1) return next(err1);
            Pixelart.deleteOne({_id: objectId}, function (err2) {
                if (err2) return next(err2);
                console.log('Object ' + objectName + ' ' + objectId + ' deleted');
                return res.json('ok');
            });
        });
});


// get one
router.get('/:id', function (req, res, next) {
    const objectId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(objectId)) return next(new Error("invalid id"));
    objectType.findOne({_id: objectId}).exec((err, response) => {
        if (err) return next(err);
        console.log('Object ' + objectName + ' ' + objectId + ' returned');
        return res.json(response);
    });
});


// get all
router.get('/', (req, res, next) => {
    objectType.find({}).exec((err, response) => {
        if (err) return next(err);
        console.log(response.length + ' ' + objectName + '(s) returned');
        return res.json(response);
    });
});


//run
router.get('/run/:id', function (req, res, next) {
    const objectId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(objectId)) return next(new Error("invalid id"));
    objectType.findOne({_id: objectId}, function (err, response) {
        if (err) return next(err);

        LWClearIntervals();
        const obj = response;
        // TODO tester si la reponse est vide

        anim_interval_id = ws2812.WS2812RunEditorImage(obj, anim_interval_id);
        // anim_interval_id = ws2812.WS2812RunWordArt("LED WALL 2019", [255, 0, 0], anim_interval_id);
        console.log('Object ' + objectName + ' ' + objectId + ' running');
        return res.json('ok');
    });
});



module.exports = router;
