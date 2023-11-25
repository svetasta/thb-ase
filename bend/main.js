const express = require('express');
const app = express();
const answersApp = require('./bend/answers');
const answeredQuestionsApp = require('./bend/answered_questions');

// Use the answers route handler at a specific URL
app.use('/bend/answer', answersApp.app);

// Use the answered questions route handler at the root URL '/'
app.use('/bend', answeredQuestionsApp.app);

// Start the server
const server = app.listen(8080, function () {
  console.log("Server runs on port 8080");
});