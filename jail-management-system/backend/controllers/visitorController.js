const Visitor = require("../models/Visitor");
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT tokens

// Register a new visitor
const registerVisitor = async (req, res) => {
  const { name, email, contact, password, confirmPassword, cnic } = req.body;

  // Validate required fields
  if (!name || !email || !contact || !password || !confirmPassword || !cnic) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check for duplicate email
    const existingVisitor = await Visitor.findOne({ email });
    if (existingVisitor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check for duplicate CNIC
    const existingCNIC = await Visitor.findOne({ cnic });
    if (existingCNIC) {
      return res.status(400).json({ message: "CNIC already registered" });
    }

    // Check for duplicate contact
    const existingContact = await Visitor.findOne({ contact });
    if (existingContact) {
      return res.status(400).json({ message: "Contact already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new visitor
    const visitor = new Visitor({
      name,
      email,
      contact,
      password: hashedPassword,
      cnic,
    });
    await visitor.save();

    res.status(201).json({
      message: "Visitor registered successfully",
      visitor: {
        id: visitor._id,
        name: visitor.name,
        email: visitor.email,
        contact: visitor.contact,
        cnic: visitor.cnic,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login visitor
const loginVisitor = async (req, res) => {
  const { cnic, password } = req.body;

  // Validate required fields
  if (!cnic || !password) {
    return res.status(400).json({ message: "CNIC and password are required" });
  }

  try {
    // Check if visitor exists using CNIC
    const visitor = await Visitor.findOne({ cnic });
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, visitor.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: visitor._id, cnic: visitor.cnic },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      visitor: {
        id: visitor._id,
        name: visitor.name,
        cnic: visitor.cnic,
        contact: visitor.contact,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerVisitor, loginVisitor };
