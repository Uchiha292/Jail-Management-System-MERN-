const mongoose = require("mongoose");

const prisonerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  crime: {
    type: String,
    required: true,
  },
  sentenceDuration: {
    type: String, // Example: "10 years"
    required: true,
  },
  cellNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Prisoner", prisonerSchema);
