const Prisoner = require("../models/Prisoner");
const Cell=require("../models/Cell");

const getAllCells = async (req, res) => {
  try {
    const AllCells = await Cell.find().populate("prisoner");
    res.status(200).json(AllCells);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cells", error });
  }
};

const AddCells = async (req, res) => {
  const { cellNo, capacity, prisoner } = req.body;

  try {
    const Prisonerexists = await Prisoner.findById(prisoner);
    if (!Prisonerexists) {
      return res.status(404).json({ message: "Prisoner not found" });
    }

    const cellAdded = new Cell({ cellNo, capacity, prisoner });
    await cellAdded.save();
    res.status(201).json(cellAdded);
  } catch (error) {
    res.status(500).json({ message: "Error creating incident", error });
  }
};

const AddPrisonerToCell= async (req, res) => {
  try {
    const {cellID,PrisonerID} =req.body;

    const GivenCell = await Cell.findById(cellID);
    if (!GivenCell) {
      return res.status(404).json({ message: "Cell not found" });
    }

    if (GivenCell.prisoners.length >= GivenCell.capacity) {
        return res.status(400).json({ message: "Cell has reached MAX capacity",GivenCell });
      }

    const GivenPrisoner = await Prisoner.findById(PrisonerID);
    if (!GivenPrisoner) {
        return res.status(405).json({ message: "Prisoner not found" });
      }
      
      GivenCell.prisoners.push(GivenPrisoner);
      await GivenCell.save();

    res.status(200).json({message: "Prisoner Sucessfully added to cell", GivenCell });
  } catch (error) {
    res.status(500).json({ message: "Error updating cell", error });
  }
};

const deleteCell = async (req, res) => {
  try {
    const deletedCell = await Cell.findByIdAndDelete(req.params.id);

    if (!deletedCell) {
      return res.status(404).json({ message: "Cell not found" });
    }

    res.status(200).json({ message: "Cell deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting incident", error });
  }
};

const RemovePrisonerFromCell= async (req, res) => {
    try {
      const {cellID,PrisonerID} =req.body;
  
      const GivenCell = await Cell.findById(cellID);
      if (!GivenCell) {
        return res.status(404).json({ message: "Cell not found" });
      }

      const GivenPrisoner = await Prisoner.findById(PrisonerID);
      if (!GivenPrisoner) {
          return res.status(405).json({ message: "Prisoner not found in database" });
        }
      
  
        const checkPrisoner=GivenCell.prisoners.indexOf(PrisonerID);
        if(checkPrisoner==-1)
        {
          return res.status(406).json({ message: "Prisoner does not belong to the cell",GivenCell });
        }
  
        GivenCell.prisoners.splice(checkPrisoner,1);
        await GivenCell.save();
  
      res.status(200).json({message: "Prisoner Sucessfully removed from cell", GivenCell });
    } catch (error) {
      res.status(500).json({ message: "Error removing prisoner from cell", error });
    }
  };
  

module.exports={
getAllCells,
AddCells,
AddPrisonerToCell,
deleteCell,
RemovePrisonerFromCell,
};
