const express = require("express");
const {
    createTransfer, 
    getTransferHistory, 
    getTransfers,
    approveTransfer
} = require("../controllers/transferController");
//const authorizeWarden = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createTransfer);
router.get("/history/:prisonerId?", getTransferHistory);
router.get("/history/", getTransfers);
router.put("/approve-transfer/:transferId", approveTransfer);

module.exports = router;