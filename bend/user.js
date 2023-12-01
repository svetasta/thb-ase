const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');


app.put('/', (req, res) =>{
    res.send('Hi with put!')
});
app.get('/', (req, res) =>{
    res.send('Hi with get!')
});

// Export the Express app for use in other modules
module.exports = {
    app: app
  };