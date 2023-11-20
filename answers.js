const  express = require ('express');
const  app = express();
const { v4: uuidv4 } = require('uuid');
const { answeredQuestions } = require('./answered_questions');

app.get('/answer/:answerId', (req, res)=> {
	let answerid =req.params.userid;
	for (const question of answeredQuestions) {
        if (question.id===answerid){
            const textForAnswer = question.text;
            return  res.send (user); 
        }
     else  {
        return  res.send ("answer not found"); 
     }  
            
      }


	
});