const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const { answeredQuestions } = require('./answered_questions');


// Handle GET requests to the /:answerId endpoint
app.get('/:answerId', (req, res) => {

// Extract the answerId parameter from the request URL  
  const answerId = req.params.answerId;
  console.log("answer-number"+ answerId);
// Initialize variables to track whether the answer is found and the text for the answer 
  let answerFound = false;
  let textForAnswer = '';


// Iterate through the answeredQuestions array to find the matching answer
  for (const question of answeredQuestions) {
    // Check if the string representation of question.id is equal to the answerId
    if (question.id.toString() === answerId) {
    // Set the textForAnswer to the text associated with the matching answer
      textForAnswer = question.text;
     // Set answerFound to true to indicate that the answer was found 
      answerFound = true;
      break;
    }
  }
// Check if the answer was found
  if (answerFound) {
    // If found, send the text of the answer as the response
    res.send(textForAnswer);
  } else {
    //send the responce with no answer if the answer not found
    res.send("Answer not found");
  }
});
// Export the Express app for use in other modules
module.exports = {
  app: app
};
