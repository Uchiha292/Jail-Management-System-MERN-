const express = require("express");
const router = express.Router();
const Guideline = require("../models/Guideline");  // Assuming you have a Guideline model

// POST: Add a new guideline
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new guideline
    const newGuideline = new Guideline({
      title,
      description
    });

    await newGuideline.save();  // Save to the database
    res.status(201).json({ message: "Guideline created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the guideline." });
  }
});

// GET: Get all guidelines
router.get("/", async (req, res) => {
  try {
    const guidelines = await Guideline.find();
    res.status(200).json(guidelines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the guidelines." });
  }
});

module.exports = router;


// Get a specific guideline by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const guideline = await Guideline.findById(id);  // Find a guideline by its ID

    if (!guideline) {
      return res.status(404).json({ message: 'Guideline not found.' });
    }

    res.status(200).json(guideline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the guideline.', error: error.message });
  }
});

// Update a guideline
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the guideline and update it
    const updatedGuideline = await Guideline.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedGuideline) {
      return res.status(404).json({ message: 'Guideline not found.' });
    }

    res.status(200).json({ message: 'Guideline updated successfully!', guideline: updatedGuideline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the guideline.', error: error.message });
  }
});

// Delete a guideline
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGuideline = await Guideline.findByIdAndDelete(id);  // Delete the guideline by ID

    if (!deletedGuideline) {
      return res.status(404).json({ message: 'Guideline not found.' });
    }

    res.status(200).json({ message: 'Guideline deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the guideline.', error: error.message });
  }
});

module.exports = router;
