// backend/controllers/wardenController.js
const Warden = require('../models/Warden');
const Jailer = require("../models/Jailer");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login Warden
const loginWarden = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if warden exists
    const warden = await Warden.findOne({ email });
    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    // Comparing passwords
    const isPasswordMatch = await bcrypt.compare(password, warden.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generating JWT token
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

//Adding Warden
const addWarden = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const warden = await Warden.findOne({ email });
    const jailer = await Jailer.findOne({ email });
    const user = await User.findOne({ email });
    if (warden || jailer || user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newWarden = new Warden({ name, email, password: hashedPassword });
    await newWarden.save();

    res.status(201).json({ message: "Warden added successfully", warden: newWarden });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginWarden, addWarden };