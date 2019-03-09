const express = require('express');
var router = express.Router();
var Users = require('./../models/register');
let jwt = require('jsonwebtoken');
let config = require('./../config');
let middleware = require('./../middleware');


router.post('/register',(req,res)=>{
    let record = {fname:req.body.fname,lname:req.body.lname, email:req.body.email,password:req.body.password};
    let user = new Users(record);
    user.save((err,response)=>{
         if(err){
             console.log(err);
         }
         else{
            res.json("Your Registration Successful");
         }
    });
 });


 router.get('/getUsers',middleware.checkToken,(req,res)=>{
    Users.find({},{_id:0,__v:0},function(err,response){
        res.json(response);
        
});
});

router.get('/logout',(req,res)=>{
   res.json("success")
});

router.post('/authenticate',(req,res)=>{
    let token = req.body.token;
    
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
          }
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.json(false);
          } else {
            req.decoded = decoded;
            return res.json(true);
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
});



router.post('/login',(req,res)=>{
    let record = { email:req.body.email,password:req.body.password};
    Users.findOne({ email: record.email,password:record.password }, function (err,response) {
        
        if (err) {
            res.json(err);
         } else {
             
             if(response != null){
                console.log(response);
                
                let token = jwt.sign({username:response.fname},
                    config.secret,
                    { expiresIn: '10m' // expires in 1 hour
                    }
                  );
                  // return the JWT token for the future API calls
                  //res.json("success")
                  //res.setHeader("Content-Type", "application/json");
                  res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token,
                    user:response.fname
                  });
             }
             else{
                res.json({
                    success: false,
                    message: 'Incorrect username or password'
                  });
             }
            
            
        }
    });
 });

 module.exports = router;