const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },  // Store the URL of the user's profile picture (optional)
}, { timestamps: true });

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
