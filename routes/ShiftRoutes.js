const express = require("express");
const {
  createShift,
  getShift,
  getAllShifts,
  updateShift,
  deleteShift,
} = require("../controllers/ShiftController");

const router = express.Router();

router.post("/", createShift);
router.get("/:id", getShift);
router.get("/", getAllShifts);
router.patch("/:id", updateShift);
router.delete("/:id", deleteShift);

module.exports = router;
