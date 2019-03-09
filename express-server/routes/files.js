const express = require('express');
const router = express.Router();
const Files = require('../models/files');
const multer = require('multer');
const path = require('path');
var fs = require('fs');

const mongoose = require('mongoose');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});


router.post('/', upload.single('fileInput'), (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    let fileRecord = new Files(
        {
            name: file.originalname,
            filename: file.filename,
            path: file.path,
            url: req.protocol + '://' + req.get('host') + '/files/get/' + file.filename,
            mimetype: file.mimetype
        }
    );

    fileRecord.save((err, response) => {
        if (err) {
            console.log(err);
        } else {
            return res.json("Successful upload !");
        }
    });
    console.log('save in database :')
    console.log(fileRecord);
});

router.delete('/', function (req, res) {
    const fileId = req.body.id;

    if(!mongoose.Types.ObjectId.isValid(fileId)) res.status(500).send("invalid id");

    Files.findOne({_id: fileId}, function (err, response) {

        if (err) return res.status(500).send(err);
        if (!response) return res.status(500).send("invalid id");

        console.log(response);

        // delete file
        var filePath = process.env.PWD + '/' + response.path;
        fs.unlinkSync(filePath);

        Files.deleteOne({_id: fileId}, function (err) {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Successful delete !",
                id: fileId
            };
            res.status(200).send(response);
        });
    });


});

router.get('/', (req, res) => {
    Files.find({}, function (err, response) {
        console.log(response);
        return res.json(response);
    });
});


router.get('/get/:name', function (req, res, next) {

    var options = {
        root: process.env.PWD + '/public/files/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });

});


module.exports = router;
