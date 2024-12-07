const mongoose = require("mongoose");
const VisitationRequest = require("../models/VisitationRequest"); // Adjust the import as necessary
const Visitor = require("../models/Visitor"); // Assuming you have a Visitor model
const Prisoner = require("../models/Prisoner"); // Assuming you have a Prisoner model
const express = require('express');

const router = express.Router();  // This initializes the router
router.post("/request", async (req, res) => {
  const { visitorEmail, prisonerId, visitDate } = req.body;

  // Ensure all required fields are provided
  if (!visitorEmail || !prisonerId || !visitDate) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Check if the visitor with the given email exists
    const visitor = await Visitor.findOne({ email: visitorEmail });
    if (!visitor) {
      return res
        .status(404)
        .json({ message: "Visitor not found with the provided email." });
    }

    // Check if the prisoner exists
    const prisoner = await Prisoner.findById(prisonerId);
    if (!prisoner) {
      return res.status(404).json({ message: "Prisoner not found with the provided ID." });
    }

    // Create the visitation request
    const newRequest = new VisitationRequest({
      visitorId: visitor._id,  // Use the visitor's ObjectId, not email
      prisonerId,
      visitDate,
      status: "Pending",  // Default status
    });

    await newRequest.save();

    res.status(201).json({
      message: "Visitation request submitted successfully!",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error while creating visitation request:", error);
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
});// GET request to fetch visitation history by visitor CNIC
router.get("/history/:visitorCnic", async (req, res) => {
  const { visitorCnic } = req.params;

  // Validate the visitor CNIC format (you can add custom CNIC validation logic if needed)
  if (!visitorCnic) {
    return res.status(400).json({ message: "Visitor CNIC is required." });
  }

  try {
    // Search for the visitor by their CNIC
    const visitor = await Visitor.findOne({ cnic: visitorCnic }); // Assuming the collection is named 'Visitor'

    // Check if the visitor exists
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found." });
    }

    // Fetch visitation history for the found visitor
    const visitationHistory = await VisitationRequest.find({ visitorId: visitor._id })
      .populate("prisonerId", "name crime") // Populate prisoner details
      .sort({ visitDate: -1 }); // Sort by visit date in descending order

    if (!visitationHistory || visitationHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No visitation history found for this visitor." });
    }

    res.status(200).json(visitationHistory);
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error: error.message });
  }
});

module.exports = router;
