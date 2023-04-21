const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb+srv://TitanUp:2bf61cea@titanup.skw5jkp.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for the login information
const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
  schoolId: String
});

// Create a model for the login information
const Login = mongoose.model('Login', loginSchema);

// Set up middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up a route to handle form submissions
app.post('/login', (req, res) => {
  const { email, password, schoolId } = req.body;

  // Create a new Login document with the form data
  const login = new Login({
    email,
    password,
    schoolId
  });

  // Save the Login document to the database
  login.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving login information to database');
    } else {
      res.send('Login information saved to database');
    }
  });
});
//delete record

app.post('/delete/:id', async (req, res) => {
  await Post.deleteOne({_id: req.params.id})
  return res.redirect('/')
});
// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
