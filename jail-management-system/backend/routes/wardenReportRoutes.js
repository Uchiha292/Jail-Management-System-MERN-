const express = require("express");
const router = express.Router();
const {
  getIncidentFrequency,
  getPrisonersInfo,
} = require("../controllers/wardenReportController");


router.get("/incident-frequency", getIncidentFrequency);
router.get("/prisoner-demographics", getPrisonersInfo);

module.exports = router;