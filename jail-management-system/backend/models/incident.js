const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  prisoner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prisoner",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
});

module.exports = mongoose.model("Incident", incidentSchema);