// backend/controllers/wardenController.js
const Warden = require('../models/Warden');
const Jailer = require("../models/Jailer");
const User = require("../models/User");
const bcrypt = require('bcryptjs'); // Import bcryptjs
const jwt = require('jsonwebtoken');

// Login Warden
const loginWarden = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const warden = await Warden.findOne({ email });
    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, warden.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: warden._id, email: warden.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      warden: {
        id: warden._id,
        name: warden.name,
        email: warden.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add Warden (Hash Password)
const addWarden = async (req, res) => {
  const { name, email, password } = req.body; // Get password from request body

  if (!name || !email || !password) { // Check if password is provided
    return res.status(400).json({ message: "All fields (name, email, password) are required" });
  }

  try {
    // Check if user already exists across different models
    const warden = await Warden.findOne({ email });
    const jailer = await Jailer.findOne({ email });
    const user = await User.findOne({ email });
    if (warden || jailer || user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newWarden = new Warden({
      name,
      email,
      password: hashedPassword, // Save the hashed password, not the plain one
    });
    await newWarden.save();

    // Do NOT return the password in the response for security
    res.status(201).json({
      message: "Warden added successfully",
      warden: {
        id: newWarden._id,
        name: newWarden.name,
        email: newWarden.email,
        // DO NOT include password here
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginWarden, addWarden };