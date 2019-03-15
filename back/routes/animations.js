const express = require('express');
const router = express.Router();
const Animations = require('../models/animations');
const ws2812 = require('../ws2812');

const mongoose = require('mongoose');




// create
router.post('/', function (req, res, next) {
    const animation = req.body;
    if (!animation) {
        const error = new Error('No data found');
        error.httpStatusCode = 400;
        return next(error);
    }

    // add
    let animationRecord = new Animations(animation);

    animationRecord.save((err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Animation ' + response._id + ' added');
            return res.json(response._id);
        }
    });

});


// update
router.post('/:id', function (req, res, next) {

    const animationId = req.params.id;
    const animation = req.body;

    if (!animation) {
        const error = new Error('No data found');
        error.httpStatusCode = 400;
        return next(error);
    }

    Animations.updateOne({_id: animationId}, { $set: { name: animation.name, animationItems: animation.animationItems } }, function(err, affected, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log('Aniamtion ' + animationId + ' updated');
            return res.json(animationId);
        }
    });

});



// delete
router.delete('/:id', function (req, res) {
    const animationId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(animationId)) res.status(500).send("invalid animationId");

    Animations.deleteOne({_id: animationId}, function (err) {
        if (err) return res.status(500).send(err);

        console.log('Animation ' + animationId + ' deleted');
        const response = {
            message: "Successful delete !",
            id: animationId
        };
        res.status(200).send(response);
    });

});



// get one
router.get('/:id', function (req, res) {
    const animationId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(animationId)) res.status(500).send("invalid animationId");

    Animations.findOne({_id: animationId}).populate('animationItems.pixelArt')
        .exec((err, response) => {
            if (err) return res.status(500).send(err);
            if (!response) return res.status(500).send("invalid animationId");

            console.log('Animation ' + animationId + ' returned');

            return res.json(response);
        });
});



// get all
router.get('/', (req, res) => {
    Animations.find({}).populate('animationItems.pixelArt')
        .exec((err, response) => {
            console.log(response.lengsth + ' animation returned');
            return res.json(response);
        });
});



//run
router.get('/run/:id', function (req, res, next) {

    const animationId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(animationId)) res.status(500).send("invalid animationId");

    Animations.findOne({_id: animationId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid animationId");

        const animation = response;

        // appel fonction convertir
        // var img_data = ws2812.WS2812ImageToRgb(path);
        // ecrire dans le fichier
        // ws2812.WS2812DisplayImage(img_data);


        console.log('Animation ' + animationId + ' running');

        const r = {
            message: "Successful run !"
        };
        res.status(200).send(r);

    });
});







module.exports = router;
