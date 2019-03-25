const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const websocket = require('ws');
const ws2812 = require('./ws2812');

//assigning port 
const API_PORT =  8080;
const HTTP_PORT = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cors());

// Add headers
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));


app.use('/users', require('./routes/users'));
app.use('/pixelarts', require('./routes/pixelarts'));
app.use('/animations', require('./routes/animations'));
app.use('/wordarts', require('./routes/wordarts'));
app.use('/scripts', require('./routes/scripts'));

app.use(express.static('../front/dist/ledwall-app'));  //Serving the angular deployement files


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
mongoose.connect(db.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
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
app.listen(API_PORT,() => {
  console.log(`App Server Listening at ${API_PORT}`);
});
