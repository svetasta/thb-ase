const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
const Post = require('../models/post'); 

app.use(express.json({ limit: '1mb' }));
  
app.use(cors());


app.post('/', async (req, res) => {
    try {
        const loggedUsername = req.body.username;

      // Fetch all posts for the specified user from the database
      const posts = await Post.find({ username:loggedUsername});
      
      //const postTexts = posts.map(post => post.text);
       res.json(posts);
    
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error-on user-posts');
    }
  });

  
module.exports = {
    app: app,
  };
  