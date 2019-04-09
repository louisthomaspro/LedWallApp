const express = require('express');
const router = express.Router();
const ws2812 = require('../ws2812');

function LWClearIntervals()
{
    clearInterval(anim_interval_id);  //Used to stop the currently displayed animation/image
    clearInterval(oldplaylist_interval_id);
    clearInterval(playlist_interval_id);
    ws2812.WS2812Clear();
}

router.get('/turnoff', function (req, res, next) {
    console.log('Turning off');

    // TODO Turn off ledwall
    LWClearIntervals();
    res.json('OK');
});



module.exports = router;
