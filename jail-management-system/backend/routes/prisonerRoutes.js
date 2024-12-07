const express = require("express");
const mongoose = require("mongoose");
const Prisoner = require("../models/Prisoner"); // Import the Prisoner model

const router = express.Router();

// Function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST: Add a new prisoner
router.post("/add", async (req, res) => {
  const { name, age, crime, sentenceDuration, cellNumber } = req.body;

  if (!name || !age || !crime || !sentenceDuration || !cellNumber) {
    return res.status(400).json({
      message: "All fields are required: name, age, crime, sentenceDuration, and cellNumber.",
    });
  }

  try {
    const newPrisoner = new Prisoner({
      name,
      age,
      crime,
      sentenceDuration,
      cellNumber,
    });

    await newPrisoner.save();

    res.status(201).json({
      message: "Prisoner added successfully!",
      prisoner: newPrisoner,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the prisoner.",
      error: error.message,
    });
  }
});

// GET: Fetch all prisoners
router.get("/", async (req, res) => {
  try {
    const prisoners = await Prisoner.find();
    res.status(200).json(prisoners);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching prisoners.",
      error: error.message,
    });
  }
});

// GET: Fetch a single prisoner by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid prisoner ID format." });
  }

  try {
    const prisoner = await Prisoner.findById(id);

    if (!prisoner) {
      return res.status(404).json({ message: "Prisoner not found." });
    }

    res.status(200).json(prisoner);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the prisoner.",
      error: error.message,
    });
  }
});

// PUT: Update a prisoner by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, crime, sentenceDuration, cellNumber } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid prisoner ID format." });
  }

  try {
    const updatedPrisoner = await Prisoner.findByIdAndUpdate(
      id,
      { name, age, crime, sentenceDuration, cellNumber },
      { new: true, runValidators: true }
    );

    if (!updatedPrisoner) {
      return res.status(404).json({ message: "Prisoner not found." });
    }

    res.status(200).json({
      message: "Prisoner updated successfully!",
      prisoner: updatedPrisoner,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the prisoner.",
      error: error.message,
    });
  }
});

// DELETE: Remove a prisoner by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid prisoner ID format." });
  }

  try {
    const deletedPrisoner = await Prisoner.findByIdAndDelete(id);

    if (!deletedPrisoner) {
      return res.status(404).json({ message: "Prisoner not found." });
    }

    res.status(200).json({
      message: "Prisoner deleted successfully!",
      prisoner: deletedPrisoner,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the prisoner.",
      error: error.message,
    });
  }
});

module.exports = router;
