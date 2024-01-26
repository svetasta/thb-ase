const express = require('express');
const app = express();
const answersApp = require('./answers');
const userRegister = require('./register')
const userLogin = require('./login')
const answeredQuestionsApp = require('./answered_questions');
const connectDB = require('../db')
const path = require('path');
// Load environment variables from .env file
require('dotenv').config();
// Use the answers route handler at a specific URL
app.use('/answers', answersApp.app);
//use frontend
app.use(express.static("fend"));

// Use the answered questions route handler at the root URL '/'
app.use('/answered_questions', answeredQuestionsApp.app);

app.use('/register', userRegister.app);
app.use('/login', userLogin.app);

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