const express = require('express');
const app = express();
const answersApp = require('./answers');
const userApp = require('./user')
const answeredQuestionsApp = require('./answered_questions');
const connectDB = require('../db')

// Load environment variables from .env file
require('dotenv').config();
// Use the answers route handler at a specific URL
app.use('/answers', answersApp.app);
//use frontend
app.use(express.static("fend"));

// Use the answered questions route handler at the root URL '/'
app.use('/answered_questions', answeredQuestionsApp.app);

app.use('/register', userApp.app);

//connect to MongoDB
connectDB();

// Start the server
const server = app.listen(8080, function () {
  console.log("Server runs on port 8080");
});