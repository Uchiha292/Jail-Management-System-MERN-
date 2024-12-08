const express = require("express");
const {
    createTransfer, 
    getTransferHistory, 
    approveTransfer
} = require("../controllers/transferController");
//const authorizeWarden = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createTransfer);
router.get("/history/:prisonerId?", getTransferHistory);
router.put("/approve-transfer/:transferId", approveTransfer);

module.exports = router;