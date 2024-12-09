const Jailer = require("../models/Jailer");


// Login Warden
const LoginJailer = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if warden exists
    const warden = await Jailer.findOne({ email });
    if (!warden) {
      return res.status(404).json({ message: "jailer not found" });
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
        const jailer = await Jailer.findById(id);
      
        // Check if the jailer exists
        if (!jailer) {
            return res.status(404).json({ message: "Jailer not found" });
        }

        // Check if the jailer is already inactive
        if (!jailer.isActive) {
            return res.status(400).json({ message: "Jailer already inactive" });
        }

        // Updating jailer's status to inactive
        jailer.isActive = false;
        await jailer.save();

        res.status(200).json({ message: "Jailer deactivated successfully", jailer });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Activate jailer
const activateJailer = async (req, res) => {
    const { id } = req.params;

    try {
        const jailer = await Jailer.findById(id);
      
        // Check if the jailer exists
        if (!jailer) {
            return res.status(404).json({ message: "Jailer not found" });
        }

        // Check if the jailer is already active
        if (jailer.isActive) {
            return res.status(400).json({ message: "Jailer already active" });
        }

        // Updating jailer's staus to active
        jailer.isActive = true;
        await jailer.save();

        res.status(200).json({ message: "Jailer activated successfully", jailer });
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
  LoginJailer,
  addJailer,
  updateJailer,
  deactivateJailer,
  activateJailer,
  getAllJailers,
};