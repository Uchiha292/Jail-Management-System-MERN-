const express = require("express");
const Visitor = require("../models/Visitor"); // Import the Visitor model
const { registerVisitor, loginVisitor } = require("../controllers/visitorController"); // Import the registerVisitor controller
const router = express.Router();

// Route to register a new visitor
router.post("/register", registerVisitor);
router.post("/login", loginVisitor);

// Route to get all visitors
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find(); // Fetch all visitors from the database
    res.status(200).json(visitors);
  } catch (error) {
    console.error("Error retrieving visitors:", error.message);
    res.status(500).json({ message: "Failed to retrieve visitors", error: error.message });
  }
});

// Route to get a specific visitor by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const visitor = await Visitor.findById(id); // Find visitor by ID
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json(visitor);
  } catch (error) {
    console.error("Error retrieving visitor:", error.message);
    res.status(500).json({ message: "Failed to retrieve visitor", error: error.message });
  }
});
router.get("/me",  async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.user.id); // Assuming the token payload includes `id`
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json(visitor);
  } catch (error) {
    console.error("Error retrieving visitor:", error.message);
    res.status(500).json({ message: "Failed to retrieve visitor", error: error.message });
  }
});

module.exports = router;
