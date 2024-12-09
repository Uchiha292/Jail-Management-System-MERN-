const Prisoner = require("../models/Prisoner");
const Incident = require("../models/incident");

// Get Incident Frequency per Prisoner
const getIncidentFrequency = async (req, res) => {
  try {
    const prisonerIncidents = await Incident.aggregate([
      { $group: { _id: "$prisoner", count: { $sum: 1 } } },
      { $lookup: { from: "prisoners", localField: "_id", foreignField: "_id", as: "prisonerDetails" } },
      { $unwind: "$prisonerDetails" },
      {
        $project: {
          prisonerName: "$prisonerDetails.name",
          incidentCount: "$count",
        },
      },
    ]);

    // If no incidents, return an empty array
    if (prisonerIncidents.length === 0) {
      return res.json({ data: [] });
    }

    res.json({ data: prisonerIncidents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Prisoner Demographics
const getPrisonersInfo = async (req, res) => {
  try {
    // Counting prisoners by age group 
    const demographics = await Prisoner.aggregate([
      {
        $project: {
          ageGroup: {
            $cond: [
              { $lt: ["$age", 25] },
              "Under 25",
              { $cond: [{ $lt: ["$age", 45] }, "25-44", "45+"] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$ageGroup",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(demographics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getIncidentFrequency,
  getPrisonersInfo,
};