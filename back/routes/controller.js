const express = require('express');
const router = express.Router();

const ks = require('node-key-sender');




router.get('/up', function (req, res, next) {
    console.log('Key : UP');
    ks.sendKey('@38');
    res.json('OK');
});

router.get('/down', function (req, res, next) {
    console.log('Key : DOWN');
    ks.sendKey('@40');
    res.json('OK');
});

router.get('/left', function (req, res, next) {
    console.log('Key : LEFT');
    ks.sendKey('@37');
    res.json('OK');
});

router.get('/right', function (req, res, next) {
    console.log('Key : RIGHT');
    ks.sendKey('@39');
    res.json('OK');
});



module.exports = router;
