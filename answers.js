const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const { answeredQuestions } = require('./answered_questions');

app.get('/:answerId', (req, res) => {
    console.log("answer-number")
  const answerId = req.params.answerId;
  let answerFound = false;
  let textForAnswer = '';

  for (const question of answeredQuestions) {
    if (question.id === answerId) {
      textForAnswer = question.text;
      answerFound = true;
      break;
    }
  }

  if (answerFound) {
    res.send(textForAnswer);
  } else {
    res.send("Answer not found");
  }
});

module.exports = {
  app: app
};
