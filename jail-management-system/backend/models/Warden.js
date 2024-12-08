// backend/models/Warden.js
const mongoose = require('mongoose');

const wardenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Warden = mongoose.model('Warden', wardenSchema);
module.exports = Warden;