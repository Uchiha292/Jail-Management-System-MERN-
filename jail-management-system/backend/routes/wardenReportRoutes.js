const express = require("express");
const router = express.Router();
const {
  getIncidentFrequency,
} = require("../controllers/wardenReportController");


router.get("/incident-frequency", getIncidentFrequency);

module.exports = router;