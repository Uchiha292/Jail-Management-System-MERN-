const Transfer = require("../models/Transfer");
const Prisoner = require("../models/Prisoner");

//Transfering Prisoner
const createTransfer = async (req, res) => {
  const { prisonerId, fromFacility, toFacility, transferDate} = req.body;

  try {
    const prisoner = await Prisoner.findById(prisonerId);
    if (!prisoner) {
      return res.status(404).json({ message: "Prisoner not found" });
    }

    const transfer = new Transfer({
      prisoner: prisoner._id,
      fromFacility,
      toFacility,
      transferDate,
    });

    await transfer.save();
    res.status(201).json({ message: "Transfer request created", transfer });
  } catch (error) {
    res.status(500).json({ message: "Error creating transfer", error });
  }
};

// View transfer history of a prisoner
const getTransferHistory = async (req, res) => {
  const { prisonerId } = req.params;

  try {
    let transfers;
    if (prisonerId) {
      transfers = await Transfer.find({ prisoner: prisonerId })
        .populate("prisoner", "name age crime")
        .sort({ transferDate: -1 });
    } else {
      transfers = await Transfer.find()
        .populate("prisoner", "name age crime")
        .sort({ transferDate: -1 });
    }

    if (transfers.length === 0) {
      return res.status(200).json({ transfers: null }); // Return null if no transfers found
    }

    res.status(200).json({ transfers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transfer history", error });
  }
};

// Approving transfer of prisoner
const approveTransfer = async (req, res) => {
  const { transferId } = req.params;

  try {
    const transfer = await Transfer.findById(transferId);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }

    transfer.approved = true;
    transfer.approvalDate = new Date();
    await transfer.save();

    res.status(200).json({ message: "Transfer approved", transfer });
  } catch (error) {
    res.status(500).json({ message: "Error approving transfer", error });
  }
};

module.exports = {
  createTransfer,
  getTransferHistory,
  approveTransfer
};