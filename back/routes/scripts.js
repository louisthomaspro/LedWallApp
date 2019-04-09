const express = require('express');
const router = express.Router();
const Script = require('../models/script');
const ws2812 = require('../ws2812');
const path = require('path');
const fs = require('fs');
const {PythonShell} = require('python-shell')

let options = {
    pythonPath: '/usr/bin/python3.6'
};

const multer = require('multer');

const mongoose = require('mongoose');


const objectName = 'Script';
const objectType = Script;


function LWClearIntervals()
{
    if (pythonScript != null) {
        if (pythonScript.childCount != null) pythonScript.childCount.kill('SIGINT');
        pythonScript = null;
    }
    clearInterval(anim_interval_id);  //Used to stop the currently displayed animation/image
    clearInterval(oldplaylist_interval_id);
    clearInterval(playlist_interval_id);
    ws2812.WS2812Clear();
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/scripts')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});


// create
router.post('/', upload.single('fileInput'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    fs.chmodSync(file.path, 0550);

    let record = new Script(
        {
            name: file.originalname,
            filename: file.filename,
            path: file.path,
            extension: file.filename.split('.').pop()
        }
    );

    record.save((err) => {
        if (err) return next(err);
        return res.json("ok");
    });
});


// delete
router.delete('/:id', function (req, res) {
    const objectId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(objectId)) return next(new Error("invalid id"));
    objectType.findOne({_id: objectId}, function (err, response) {
        if (err) return next(err);

        // delete file
        var filePath = process.env.PWD + '/' + response.path;
        fs.unlinkSync(filePath);

        objectType.deleteOne({_id: objectId}, function (err) {
            if (err) return next(err);
            return res.json("ok");
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
        const script = response;
        // TODO tester si la reponse est vide

        pythonScript = PythonShell.run(script.path, options, function (err) {
            console.log('salut');
            if (err) throw err;
            console.log('finished');
        });

        console.log('Object ' + objectName + ' ' + objectId + ' running');
        return res.json('ok');
    });
});


module.exports = router;
