const express = require("express");
const router = express.Router();
const {
  getAllVisitationRequest,
  ApproveVisitationRequest,
  DenyVisitationRequest,
} = require("../controllers/visitationController");

router.get("/", getAllVisitationRequest);

router.put("/approve", ApproveVisitationRequest);

router.put("/deny", DenyVisitationRequest);

module.exports = router;
