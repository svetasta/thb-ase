//register.js
const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
app.use(express.json({limit:'1mb'}));
const User = require('../models/user'); 


function generateRandomUserID() {
  const randomUserId = uuidv4();
  /*if (users[randomUserId]) {
    return generateRandomUser();
  } else {
          users[randomUserId] = user;*/
          console.log (typeof randomUserId)
    return randomUserId;
  //
}

// Update user information 
app.post('/', async (req, res) => {
  console.log ("ping-ping")
  const newUsername = req.body.newUsername;
  const newUserpassword=req.body.newUserpassword;
  const newUseremail = req.body.newUseremail;
  const userID=generateRandomUserID();
  const userJson= {user:newUsername, userpassword:newUserpassword, userId:userID, userMail:newUseremail};
  const userJsonMongo = { username: newUsername, password: newUserpassword, userID: userID, userMail:newUseremail}
  console.log (userJson);
  console.log (userJsonMongo);
  //res.json(userJson);
  const newUser = new User(userJsonMongo);
  try {
   //  Check if the username already exists
    const existingUser = await User.findOne({ userID});

    if (existingUser) {
      return res.status(400).json({ msg: 'Sorry!Try again' });
    }
    const existingUserName = await User.findOne({username:newUsername});
    if (existingUserName) {
      return res.status(400).json({ msg: 'Username already exists' });
    }
    // Create a new user
  //  const newUser = new User({ username, password, userID});

    // Save the user to the database
    await  newUser.save();
    res.json(userJson);
    return res.json({ msg: 'User registered successfully' });
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