const Prisoner = require("../models/Prisoner");
const Visitor = require("../models/Visitor");
const VisitationRequest=require("../models/VisitationRequest");

const getAllVisitationRequest = async (req, res) => {
  try {
    const AllCells = await VisitationRequest.find().populate('visitorId', 'name email contact').populate('prisonerId', 'name age crime sentenceDuration cellNumber')  ;
    res.status(200).json(AllCells);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving All Visitation Request", error });
  }
};

const ApproveVisitationRequest= async (req, res) => {
  try {
    const {VisitationRequestID} =req.body;

    const GivenCell = await VisitationRequest.findById(VisitationRequestID);
    if (!GivenCell) {
      return res.status(404).json({ message: "Visitation Request not found" });
    }
      
      GivenCell.status="Approved";
      await GivenCell.save();

    res.status(200).json({message: "Prisoner Sucessfully added to cell", GivenCell });
  } catch (error) {
    res.status(500).json({ message: "Error updating cell", error });
  }
};
  
const DenyVisitationRequest= async (req, res) => {
  try {
    const {VisitationRequestID} =req.body;

    const GivenCell = await VisitationRequest.findById(VisitationRequestID);
    if (!GivenCell) {
      return res.status(404).json({ message: "Visitation Request not found" });
    }
      
      GivenCell.status="Denied";
      await GivenCell.save();

    res.status(200).json({message: "Prisoner Sucessfully added to cell", GivenCell });
  } catch (error) {
    res.status(500).json({ message: "Error updating cell", error });
  }
};



module.exports={
getAllVisitationRequest,
ApproveVisitationRequest,
DenyVisitationRequest,
};
