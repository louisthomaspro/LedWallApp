const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const websocket = require('ws');
const ws2812 = require('./ws2812');
const ip = require("ip");

//assigning port
const PORT = process.env.PORT || '3000';



if(process.env.NODE_ENV === "production")
{
  console.log('/*** PRODUCTION ***/');
  console.log('- console.log disabled');
  console.log = function(){};
} else {
  console.log('/*** DEVELOPMENT ***/');
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Add headers
const whitelist = ['http://' + ip.address() + ':4200', 'http://' + 'localhost' + ':4200', 'http://' + 'localhost'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// app.use(cors(corsOptions));
app.use(cors());



app.use('/users', require('./routes/users'));
app.use('/pixelarts', require('./routes/pixelarts'));
app.use('/animations', require('./routes/animations'));
app.use('/wordarts', require('./routes/wordarts'));
app.use('/scripts', require('./routes/scripts'));
app.use('/controller', require('./routes/controller'));
app.use('/special', require('./routes/special'));



//WS2812 Direct link websocket
const wss = new websocket.Server({ port: 8069 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', JSON.parse(message));
    var img_data = ws2812.WS2812JSONToRgb(message);
    ws2812.WS2812DisplayImage(img_data);
  });
  ws.send('connected');
});


/* Database connection setup */
db = require('./DB');
mongoose.Promise = global.Promise;
mongoose.connect(db.DB, { useMongoClient:true }).then(
  () => {console.info('Database is connected') },
  err => { console.error('Can not connect to the database'+ err)}
);


/* Simple route */
app.get('/', (req,res) => {
  return res.end('Api working');
});

/* for catching 404 errors */
app.use((req, res, next) => {
  res.status(404).send('404');
});

/* for cathing all errors */
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

/* run api */
app.listen(PORT,(req) => {
  if(process.env.NODE_ENV === "production") {
    console.info('API running at http://' + ip.address() + ':' + PORT);
  } else {
    console.info('API running at http://' + 'localhost' + ':' + PORT);
  }
});
