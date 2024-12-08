const Prisoner = require("../models/Prisoner");
const Incident = require("../models/incident");

// Get Incident Frequency per Prisoner
const getIncidentFrequency = async (req, res) => {
  try {
    const prisonerIncidents = await Incident.aggregate([
      { $group: { _id: "$prisoner", count: { $sum: 1 } } },
      { $lookup: { from: "Prisoner", localField: "_id", foreignField: "_id", as: "prisonerDetails" } },
      { $unwind: "$prisonerDetails" },
      {
        $project: {
          prisonerName: "$prisonerDetails.name",
          incidentCount: "$count",
        },
      },
    ]);

    // If no incidents
    if (prisonerIncidents.length === 0) {
      return res.json({ message: "No incidents" });
    }

    res.json(prisonerIncidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getIncidentFrequency,
};