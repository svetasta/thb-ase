const express = require('express');
const app = express();
const cors = require('cors');
const User = require('../models/user');

app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.post('/', async (req, res) => {
  const loggedUsername = req.body.newUsername;
  const loggedUserPassword = req.body.newUserpassword;

  try {
    const existingUser = await User.findOne({ username: loggedUsername });

    if (existingUser) {
      if (existingUser.password === loggedUserPassword) {
        // Update isLoggedIn status
        existingUser.isLoggedIn = true;
        await existingUser.save();
        res.json({ username: loggedUsername, isLoggedIn: true });
      } else {
        res.status(401).json({ msg: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ msg: 'User not found, please register' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('Hi with get!');
});

module.exports = {
  app: app,
};
