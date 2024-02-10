const express = require('express');
const app = express();
const answersApp = require('./answers');
const userRegister = require('./register')
const userLogin = require('./login')
const userPosts= require('./userPosts');
const connectDB = require('../db')
const path = require('path');
const uploadPostData =require ('./uploadpics');
const posts = require('./posts');
const userPostByID = require('./userPostByID');


// Load environment variables from .env file
require('dotenv').config();
// Use the answers route handler at a specific URL
app.use('/answers', answersApp.app);
//use frontend
app.use(express.static("fend"));

// Use the answered questions route handler at the root URL '/'
app.use('/posts', posts.app);

app.use('/register', userRegister.app);
app.use('/login', userLogin.app);
app.use('/uploadpics', uploadPostData.app);
app.use('/userPosts',userPosts.app)
app.use('/userPostByID', userPostByID.app)





// Serve static files from the 'fend' directory
app.use(express.static(path.join(__dirname, '../fend')));

// Catch-all route for other paths, serves the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../fend', 'index.html'));
});
//connect to MongoDB
connectDB();

// Start the server
const server = app.listen(8080, function () {
  console.log("Server runs on port 8080");
});