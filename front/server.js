// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const ip = require("ip");

const app = express();


const PORT = process.env.PORT || '4200';

if(process.env.NODE_ENV === "production")
{
    console.log('/*** PRODUCTION ***/');
    console.log('- console.log disabled');
} else {
    console.log('/*** DEVELOPMENT ***/');
}


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/ledwall-app')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ledwall-app/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.set('port', PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT,(req) => {
    if(process.env.NODE_ENV === "production") {
        console.info('Front running at http://' + ip.address() + ':' + PORT);
    } else {
        console.info('Front running at http://' + 'localhost' + ':' + PORT);
    }
});
