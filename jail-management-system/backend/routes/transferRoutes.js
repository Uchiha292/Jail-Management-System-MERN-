const express = require("express");
const {
    createTransfer, 
    getTransferHistory, 
    getTransfers,
    approveTransfer,
    getUnapprovedTransfers
} = require("../controllers/transferController");
//const authorizeWarden = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createTransfer);
router.get("/history/:prisonerId?", getTransferHistory);
router.get("/history/", getTransfers);
router.put("/unapproved-transfers/approve/:transferId", approveTransfer);
router.get("/unapproved-transfers/", getUnapprovedTransfers);

module.exports = router;