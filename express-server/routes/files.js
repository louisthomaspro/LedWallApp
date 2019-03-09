const express = require('express');
const router = express.Router();
const Files = require('../models/files');
const multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});


router.post('/upload', upload.single('fileInput'), (req, res, next) => {
    const file = req.file;
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
            mimetype: file.mimetype
        }
    );

    fileRecord.save((err, response) => {
        if (err) {
            console.log(err);
        } else {
            res.json("Successful upload !");
        }
    });
});

router.get('/', (req, res) => {
    Files.find({}, {_id: 0, __v: 0}, function (err, response) {
        res.json(response);
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
