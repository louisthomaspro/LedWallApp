const express = require('express');
const router = express.Router();



router.get('/turnoff', function (req, res, next) {
    console.log('Turning off');

    // TODO Turn off ledwall

    res.json('OK');
});



module.exports = router;
