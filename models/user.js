const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userID: { type: String, required: true, unique: true, default: uuidv4 },
  userMail: { type:String, required:true, unique:true, match: /^\S+@\S+\.\S+$/,},
});

const User = mongoose.model('User', userSchema);

module.exports = User;


