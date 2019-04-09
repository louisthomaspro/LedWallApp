const express = require('express');
const router = express.Router();
const Animation = require('../models/animation');
const Pixelart = require('../models/pixelart');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');

const objectName = 'Animation';
const objectType = Animation;

const pixelName = 'Pixelart';
const pixelType = Pixelart;

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
    objectType.updateOne({_id: objectId}, { $set: {
        name: object.name,
        animationItems: object.animationItems
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
    objectType.deleteOne({_id: objectId}, function (err) {
        if (err) return next(err);
        console.log('Object ' + objectName + ' ' + objectId + ' deleted');
        return res.json('ok');
    });
});


// get one
router.get('/:id', function (req, res, next) {
    const objectId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(objectId)) return next(new Error("invalid id"));
    objectType.findOne({_id: objectId}).populate('animationItems.pixelart').exec((err, response) => {
        if (err) return next(err);
        console.log('Object ' + objectName + ' ' + objectId + ' returned');
        return res.json(response);
    });
});


// get all
router.get('/', (req, res, next) => {
    objectType.find({}).populate('animationItems.pixelart').exec((err, response) => {
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
        const animation = response;

        var animation_idx = 0;
        var animation_nb = animation.animationItems.length;

        clearInterval(oldplaylist_interval_id);

        var animatePixelArt = function() 
        {
            clearInterval(playlist_interval_id);
            if (animation_idx == animation_nb)
            {
                animation_idx = 0
            } 
            else 
            {
                anim_img_id = animation.animationItems[animation_idx].pixelart;
                anim_delay = animation.animationItems[animation_idx].time;
                console.log(anim_delay);
                animation_idx += 1;

                if(!mongoose.Types.ObjectId.isValid(anim_img_id)) return next(new Error("invalid id"));
                pixelType.findOne({_id: anim_img_id}, function (err, response) {
                    if (err) return next(err);

                    const piskel = response;
                    anim_interval_id = ws2812.WS2812RunEditorImage(piskel, anim_interval_id);
                    console.log('ANIMATION: PixelArt ' +  anim_img_id + ' running');
                });
            }
            playlist_interval_id = setInterval(animatePixelArt, anim_delay * 1000);
        };
        playlist_interval_id = setInterval(animatePixelArt, 0);
        oldplaylist_interval_id = playlist_interval_id;

        console.log('Object ' + objectName + ' ' + objectId + ' running');
        return res.json('ok');
    });
});


module.exports = router;
