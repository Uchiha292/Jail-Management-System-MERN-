const mongoose = require('mongoose');

const cellSchema = new mongoose.Schema({
  cellNo: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,},
  prisoners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prisoner',
    },
  ],
});

const Cell = mongoose.model('Cell', cellSchema);
module.exports = Cell;
