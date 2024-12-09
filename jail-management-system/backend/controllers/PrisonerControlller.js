const Prisoner = require("../models/Prisoner");
const Cell=require("../models/Cell");

const getAllPrisoner = async (req, res) => {
  try {
    const AllPrisoner = await Cell.find().populate("prisoner");
    res.status(200).json(AllPrisoner);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Prisoners", error });
  }
};

const AddPrisoner = async (req, res) => {
  const { name, age, crime, sentenceduration, cellNo } = req.body;

  try {

    const PrisonerAdded = new Prisoner({ name, age, crime, sentenceduration, cellNo });
    await PrisonerAdded.save();
    res.status(201).json(cellAdded);
  } catch (error) {
    res.status(500).json({ message: "Error creating Prisoner", error });
  }
};

const deletePrisoner = async (req, res) => {
  try {
    const deletedPrisoner = await Prisoner.findByIdAndDelete(req.params.id);

    if (!deletedPrisoner) {
      return res.status(404).json({ message: "Prisoner not found" });
    }

    res.status(200).json({ message: "Prisoner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting incident", error });
  }
};

const updatePrisoner = async (req, res) => {
    const prisonerId = req.params.id;
    const { name, age, crime, sentenceDuration, cellNumber } = req.body;
  
    try {

      const updatedPrisoner = await Prisoner.findByIdAndUpdate(id, { name, age, crime, sentenceDuration, cellNumber }, { new: true });
      
      if (!updatedPrisoner) {
        return res.status(404).json({ message: "Prisoner not found" });
      }
      res.status(200).json({ message: "Prisoner updated successfully", jailer: updatedPrisoner });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
module.exports={
getAllPrisoner,
AddPrisoner,
deletePrisoner,
updatePrisoner,
};
