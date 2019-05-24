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
    if (python_process != null) {
        python_process.kill('SIGINT');
    }
    clearInterval(anim_interval_id);  //Used to stop the currently displayed animation/image
    clearInterval(oldplaylist_interval_id);
    clearInterval(playlist_interval_id);
    ws2812.WS2812Clear();
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/scripts');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    onError : function(err, next) {
        console.log('error', err);
        next(err);
    }
}).single('fileInput');


// create
router.post('/', upload, (req, res, next) => {

    upload( req, res, ( err ) => {
        if ( err || !req.file )
            return res.send({ error: 'invalid_file' })
        console.log( 'save the file', req.file );

    });

    const file = req.file;
    // if (!file) {
    //     const error = new Error('Please upload a file');
    //     error.httpStatusCode = 400;
    //     return next(error);
    // }
    fs.chmodSync(file.path, 0550);

    let record = new Script(
        {
            name: file.originalname,
            filename: file.filename,
            path: 'public/scripts/' + file.filename,
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


        const pyshell = new PythonShell(process.env.PWD + '/' + script.path, options);

        pyshell.end(function (err) {
            if (err) {
                // return res.status(500).json({
                //     error: 1,
                //     msg: "Script error",
                //     object: err
                // });
                console.log(err);
            }
        });
        python_process = pyshell.childProcess;


        console.log('Object ' + objectName + ' ' + objectId + ' running');
        return res.status(200).json({
            error: 0,
            msg: "ok",
        });
    });
});


module.exports = router;
