const express = require("express");
const mongoose = require("mongoose");
const VisitationRequest = require("../models/VisitationRequest"); // Import VisitationRequest model

const router = express.Router();

// Function to check if a string is a valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST request to create a visitation request
router.post("/request", async (req, res) => {
  const { visitorId, prisonerId, visitDate } = req.body;

  if (!isValidObjectId(visitorId) || !isValidObjectId(prisonerId)) {
    return res.status(400).json({
      message:
        "Invalid visitorId or prisonerId format. Must be a valid ObjectId.",
    });
  }

  try {
    // Use valid ObjectId
    const visitorObjectId = new mongoose.Types.ObjectId(visitorId);
    const prisonerObjectId = new mongoose.Types.ObjectId(prisonerId);

    const newRequest = new VisitationRequest({
      visitorId: visitorObjectId,
      prisonerId: prisonerObjectId,
      visitDate,
      status: "Pending", // Default status
    });

    await newRequest.save();

    res.status(201).json({
      message: "Visitation request submitted successfully!",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while submitting the visitation request.",
      error: error.message,
    });
  }
});

// GET request to fetch all visitation requests
router.get("/requests", async (req, res) => {
  try {
    const requests = await VisitationRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
});

// GET request to fetch a visitation request by ID
router.get("/requests/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid request ID format." });
  }

  try {
    const visitationRequest = await VisitationRequest.findById(id);

    if (!visitationRequest) {
      return res.status(404).json({ message: "Visitation request not found." });
    }

    res.status(200).json(visitationRequest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
});

// PUT request to update the status of a visitation request
router.put("/requests/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate the ID format
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid request ID format." });
  }

  try {
    const updatedRequest = await VisitationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Visitation request not found." });
    }

    res.status(200).json({
      message: "Visitation request updated successfully!",
      request: updatedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
});

// DELETE request to remove a visitation request by ID
router.delete("/requests/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid request ID format." });
  }

  try {
    const deletedRequest = await VisitationRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Visitation request not found." });
    }

    res.status(200).json({
      message: "Visitation request deleted successfully!",
      request: deletedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
});
// GET request to fetch visitation history by visitor ID
router.get("/history/:visitorId", async (req, res) => {
  const { visitorId } = req.params;

  // Validate the visitor ID format
  if (!isValidObjectId(visitorId)) {
    return res.status(400).json({ message: "Invalid visitor ID format." });
  }

  try {
    const visitationHistory = await VisitationRequest.find({ visitorId })
      .populate("prisonerId", "name crime") // Populate prisoner details
      .sort({ visitDate: -1 }); // Sort by visit date in descending order

    if (!visitationHistory || visitationHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No visitation history found for this visitor." });
    }

    res.status(200).json(visitationHistory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
});
module.exports = router;
