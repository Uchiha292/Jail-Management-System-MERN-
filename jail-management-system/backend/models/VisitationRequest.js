const mongoose = require('mongoose');

const VisitationRequestSchema = new mongoose.Schema({
  visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
  prisonerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prisoner', required: true },
  visitDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
  requestDate: { type: Date, default: Date.now },
});

const VisitationRequest = mongoose.model('VisitationRequest', VisitationRequestSchema);
module.exports = VisitationRequest;
