const express = require('express');
const app = express();
//const questions = require('./questions');
const answersApp = require('./answered_questions');

// Use the questions as needed
//console.log('Questions:', questions);

// Use the answers route handler directly at the root URL '/'
app.use('/', answersApp);

// Start the server
const server = app.listen(8080, function () {
  console.log("Server runs on port 8080");
});