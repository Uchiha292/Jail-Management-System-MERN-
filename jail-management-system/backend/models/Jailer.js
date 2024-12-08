const mongoose = require('mongoose');

const jailerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  isActive: {
    type: Boolean,
    default: true, // Active by default
  },
});

const Jailer = mongoose.model('Jailer', jailerSchema);
module.exports = Jailer;