const express = require('express');
var router = express.Router();
var Files = require('../models/files');

var fs = require('fs');
var multer = require('multer');
var path = require('path');



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({storage: storage});



router.post('/upload', upload.single('fileInput'), (req, res, next) => {
    const fileInput = req.file;
    if (!fileInput) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    let file = new Files(
        {
            name: fileInput.originalname,
            url: fileInput.path,
            extension: path.extname(fileInput.originalname)
        }
    );

    file.save((err,response)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json("Successful upload !");
        }
    });


});


router.get('/',(req,res)=>{
    Files.find({},{_id:0,__v:0},function(err, response){
        res.json(response);
    });
});


 module.exports = router;
