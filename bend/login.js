const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
app.use(express.json({limit:'1mb'}));
const User = require('../models/user'); 



// 
app.post('/', async (req, res) => {
    console.log ("ping-ping")
    const loggedUsername = req.body.newUsername;
    const loogedUserpassword=req.body.newUserpassword;
    
    const userJson= {user:newUsername, userpassword:newUserpassword};
    const userJsonMongo = { username: newUsername, password: newUserpassword }
    console.log (userJson);
    //res.json(userJson);
    const loggedUser = new User(userJsonMongo);
    try {
     //  Check if the username already exists
      const existingUser = await User.findOne({ userID});
       if (existingUser) {
        res.json(userJson);
      }
      else{
        return res.json({ msg: 'The user does not exist, please registrate' });
      }
    } catch (err) {
         console.error(err.message);
     return res.status(500).send('Server Error');
    }
  }
  );
  
  
  app.get('/', (req, res) =>{
      res.send('Hi with get!')
  });
  
  // Export the Express app for use in other modules
  module.exports = {
      app: app
    };