const express = require('express');
const router = express.Router();
const Wordart = require('../models/wordart');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');

const objectName = 'Wordart';
const objectType = Wordart;

function LWClearIntervals()
{
    clearInterval(anim_interval_id);  //Used to stop the currently displayed animation/image
    clearInterval(oldplaylist_interval_id);
    clearInterval(playlist_interval_id);
    ws2812.WS2812Clear();
}

// {
//     "text": "Le meilleur ledwall !",
//     "textColor": "#FFFFFF",
//     "bgPixelArt": null
// }



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
        console.log(response);
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
            text: object.text,
            bgColor: object.bgColor,
            textColor: object.textColor
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
        console.log(obj.text);
        anim_interval_id = ws2812.WS2812RunWordArt(obj.text, obj.textColor, obj.bgColor, anim_interval_id);


        console.log('Object ' + objectName + ' ' + objectId + ' running');
        return res.json('ok');
    });
});


module.exports = router;
