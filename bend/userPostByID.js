const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
const Post = require('../models/post'); 

app.use(express.json({ limit: '1mb' }));
  
app.use(cors());


app.post('/', async (req, res) => {
    console.log('GOT the ID!!')
    try {
       
        console.log(req.body.id+"ID ON SERVER")
        const postID = req.body.id; 

        const post = await Post.findById(postID);
        
        if (!post) {
            // If the post is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // If the post is found, return it as JSON response
        res.json(post);
        
     
    
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error-on user-posts');
    }
  });

  app.post('/click', async (req, res) => {
    try {
        const postID = req.body.id;
        const clickNumber = req.body.likes;

        // Find the post by ID
        const post = await Post.findById(postID);

        // Update the likes count
        post.likes = clickNumber;

        // Save the updated post
        await post.save();

        res.status(200).json({ message: 'Likes count updated successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    app: app,
  };
  
