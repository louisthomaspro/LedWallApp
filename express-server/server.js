const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("X-Content-Type-Options", "nosniff");
  
//   next();
//   //express.static(path.join(__dirname, 'build'))
// });


app.use(cors());

//re rourting to the User Registration
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
app.use('/users', userRouter);
app.use('/products', productRouter);



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