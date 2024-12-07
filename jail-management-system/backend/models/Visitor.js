const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true, // Enforce uniqueness for the contact
    },
    password: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true, // Ensure CNIC is unique
    },
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
