const express = require("express");
const router = express.Router();
const {
  getAllCells,
  AddCells,
  AddPrisonerToCell,
  deleteCell,
  RemovePrisonerFromCell,
} = require("../controllers/cellController");

router.get("/", getAllCells);

router.post("/add", AddCells);

router.put("/add-prisoner", AddPrisonerToCell);

router.put("/remove-prisoner", RemovePrisonerFromCell);

router.delete("/:id", deleteCell);

module.exports = router;
