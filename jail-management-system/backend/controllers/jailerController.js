const Jailer = require("../models/Jailer");

// Add new jailer
const addJailer = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingJailer = await Jailer.findOne({ email });
    if (existingJailer) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newJailer = new Jailer({ name, email, password });
    await newJailer.save();
    res.status(201).json({ message: "Jailer added successfully", jailer: newJailer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Updating jailer
const updateJailer = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedJailer = await Jailer.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedJailer) {
      return res.status(404).json({ message: "Jailer not found" });
    }
    res.status(200).json({ message: "Jailer updated successfully", jailer: updatedJailer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Deactivate jailer
const deactivateJailer = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedJailer = await Jailer.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!updatedJailer) {
      return res.status(404).json({ message: "Jailer not found" });
    }
    res.status(200).json({ message: "Jailer deactivated successfully", jailer: updatedJailer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all jailers
const getAllJailers = async (req, res) => {
  try {
    const jailers = await Jailer.find();
    res.status(200).json(jailers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addJailer,
  updateJailer,
  deactivateJailer,
  getAllJailers,
};