const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');

// create Express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// connect to the database
const uri = 'mongodb+srv://bishoyfarag:newpassword@titanup.uqxsj3n.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

client.connect(err => {
  if (err) {
    console.log('Error connecting to MongoDB Atlas:', err);
  } else {
    console.log('Connected to MongoDB Atlas');
    collection = client.db('mydb').collection('logins');
  }
});

// handle POST requests to the login route
app.post('/login', (req, res) => {
  // create a new login document from the request body
  const login = {
    email: req.body.email,
    password: req.body.password,
    schoolId: req.body.schoolId,
    saveLoginInfo: req.body.saveLoginInfo
  };
  
  // insert the login document into the collection
  collection.insertOne(login, (err, result) => {
    if (err) {
      console.log('Error saving login information:', err);
      res.send('Error saving login information');
    } else {
      console.log('Login information saved:', result.ops);
      res.send('Login information saved');
    }
  });
});

// start the server
app.listen(3000, () => console.log('Server started'));
