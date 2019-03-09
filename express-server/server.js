const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cors());

// Add headers
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));


//re rourting to the User Registration
const usersRouter = require('./routes/users');
const filesRouter = require('./routes/files');
app.use('/users', usersRouter);
app.use('/files', filesRouter);




// database connection setup
db = require('./DB');
mongoose.Promise = global.Promise;
mongoose.connect(db.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);


//assigning port 
const port =  8080;


app.get('/', (req,res) => {
  return res.end('Api working');
})

app.listen(port,() => {
    console.log(`App Server Listening at ${port}`);
  });
