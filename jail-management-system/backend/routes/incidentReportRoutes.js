const express = require("express");
const router = express.Router();
const {
  getAllIncidents,
  AddIncident,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");

router.get("/", getAllIncidents);

router.post("/add", AddIncident);

router.put("/:id", updateIncident);

router.delete("/:id", deleteIncident);

module.exports = router;
