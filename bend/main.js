const express = require('express');
const app = express();
const answersApp = require('./answers');
const answeredQuestionsApp = require('./answered_questions');

// Use the answers route handler at a specific URL
app.use('/answers', answersApp.app);
app.use(express.static("fend"));

// Use the answered questions route handler at the root URL '/'
app.use('/answered_questions', answeredQuestionsApp.app);

// Start the server
const server = app.listen(8080, function () {
  console.log("Server runs on port 8080");
});