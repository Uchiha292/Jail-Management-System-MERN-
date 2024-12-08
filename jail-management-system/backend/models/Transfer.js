const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  prisoner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prisoner",
    required: true,
  },
  fromFacility: {
    type: String,
    required: true,
  },
  toFacility: {
    type: String,
    required: true,
  },
  transferDate: {
    type: Date,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  approvalDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Transfer", transferSchema);