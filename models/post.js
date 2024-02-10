const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // Buffer type is used for storing binary data, such as images
  //image: {type: Buffer, required: true},
  //image :{data: Buffer,contentType: String},
  image: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  },
  user: { type: String, ref: 'User', required: true },
  username:{type:String, ref: 'User', requires:true},
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  comments: [{ type: String }], // Array of comments
  likes: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
