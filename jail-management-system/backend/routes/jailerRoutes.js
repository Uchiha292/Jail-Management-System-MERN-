const express = require("express");
const {
  addJailer,
  updateJailer,
  deactivateJailer,
  activateJailer,
  getAllJailers,
} = require("../controllers/jailerController"); // Import the controller

const router = express.Router();

router.post("/add", addJailer);
router.put("/:id", updateJailer);
router.patch("/:id/deactivate", deactivateJailer);
router.patch("/:id/activate", activateJailer);
router.get("/", getAllJailers);

module.exports = router;