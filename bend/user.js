const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');


app.put('/register', (req, res) =>{
    res.send('Hi with put!')
});
app.get('/register', (req, res) =>{
    res.send('Hi with get!')
});

// Export the Express app for use in other modules
module.exports = {
    app: app
  };