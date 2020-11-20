const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// use the following code on any request that matches the specified mount path
const mongoose = require('mongoose');
//specify where to find the schema
const Customer = require('./models/customer')
// connect and display the status 
mongoose.connect('mongodb://localhost:27017/Customers', { useNewUrlParser: true })
  .then(() => { console.log("connected"); })
  .catch(() => { console.log("error connecting"); });
  
app.use((req, res, next) => {
   console.log('This line is always called');
   res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE, PATCH'); //allowable methods
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
   next();

});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/customers', (req, res, next) => {
      //call mongoose method find (MongoDB db.Students.find())
      Customer.find() 
      //if data is returned, send data as a response 
      .then(data => res.status(200).json(data))
      //if error, send internal server error
      .catch(err => {
      console.log('Error: ${err}');
      res.status(500).json(err);
    });
  
  });
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
     
    // parse application/json
    app.use(bodyParser.json())

app.post('/customers', (req, res, next) => {
   const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cardType: req.body.cardType,
    cardNumber: req.body.cardNumber,
    exp: req.body.exp,
    cvc: req.body.cvc
  });
  //send the document to the database 
  customer.save()
    //in case of success
    .then(() => { console.log('Success');})
    //if error
    .catch(err => {console.log('Error:' + err);});

 });
//:id is a dynamic parameter that will be extracted from the URL
app.delete("/customers/:id", (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json("Deleted!");
  });

  // serve incoming put requests to /cusotmers
  app.put('/customers/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      //find a document and set new first and last names
      Customer.findOneAndUpdate({_id: req.params.id},
        {$set:{
          firstName : req.body.firstName,
          lastName : req.body.lastName,
          cardNumber: req.body.cardNumber,
          cardType: req.body.cardType,
          exp: req.body.exp,
          cvc:req.body.cvc,
        }},{new:true}) 
       .then((customer) => {
          if (customer) { //what was updated
            console.log(customer);
          } else {
            console.log("no data exist for this id");
          }
       })
      .catch((err) => {
        console.log(err);
       });
   } else {
     console.log("please provide correct id");
   }
    
  });  

});


//to use this middleware in other parts of the application
module.exports=app;