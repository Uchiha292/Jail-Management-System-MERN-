const Incident = require("../models/incident");
const Prisoner = require("../models/Prisoner");

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate("prisoner");
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving incidents", error });
  }
};

const AddIncident = async (req, res) => {
  const { prisoner, description, severity } = req.body;

  try {
    const existingPrisoner = await Prisoner.findById(prisoner);
    if (!existingPrisoner) {
      return res.status(404).json({ message: "Prisoner not found" });
    }

    const incidentAdded = new Incident({ prisoner, description, severity });
    await incidentAdded.save();
    res.status(201).json(incidentAdded);
  } catch (error) {
    res.status(500).json({ message: "Error creating incident", error });
  }
};

// Update an incident by ID
const updateIncident = async (req, res) => {
  try {
    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("prisoner");

    if (!updatedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: "Error updating incident", error });
  }
};

// Delete an incident by ID
const deleteIncident = async (req, res) => {
  try {
    const deletedIncident = await Incident.findByIdAndDelete(req.params.id);

    if (!deletedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting incident", error });
  }
};

module.exports={
getAllIncidents,
AddIncident,
updateIncident,
deleteIncident,
};
