const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const User = require('../models/user');
const Post = require ('../models/post')
//const Storage = require('@google-cloud/storage');
app.use(cors());
app.use(fileUpload());
var fs = require('fs');
/*var path = require('path');
app.set("view engine", "ejs");
require('dotenv').config();*/


app.post('/', async (req, res) => {
  try {
      const username = req.body.username;
      console.log("privet"+username);
      if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.-nothing was sent');
      }

      // Check if the user is logged in
     const loggedInUser = await User.findOne({ username, isLoggedIn: true });
      if (!loggedInUser) {
        return res.status(401).send('User is not logged in.');
        console.log('User is not logged in.');
      }

      const image = req.files.image;
     // const postContent = new Post({ image: image.data });
      console.log("it works but I do not understand how exactly");
      console.log(loggedInUser);

      const post = new Post({
        image: {
          data: image.data,        
          contentType: image.mimetype   
        },
        user: loggedInUser.userID,
        text: req.body.text,
      });
      

    await post.save();
    res.status(200).send('Image uploaded successfully.');
    console.log ("saved in mongodb")

  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error - no idea what is wrong');
  }
});


/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
//const bucketName = 'example-bucket-thb';

// The path to your file to upload
// const filePath = 'example-bucket-thb';

// The new ID for your GCS file
// const destFileName = 'your-new-file-name';

// Imports the Google Cloud client library
//const {Storage} = require('@google-cloud/storage');

// Creates a client
/*const storage = new Storage();

async function uploadFile() {
  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);

*/
module.exports = {
  app: app,
};
