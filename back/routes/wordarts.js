const express = require('express');
const router = express.Router();
const Wordart = require('../models/wordart');
const ws2812 = require('../ws2812');
// const jimp = require('');

const mongoose = require('mongoose');


const objectName = 'Wordart';
const objectType = Wordart;


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

        const wordart = response;
        // TODO tester si la reponse est vide

        // TODO algo à faire

        console.log('Object ' + objectName + ' ' + objectId + ' running');
        return res.json('ok');
    });
});


module.exports = router;