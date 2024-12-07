const express = require("express");
const {
  createLeave,
  getLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave,
} = require("../controllers/LeaveController");

const router = express.Router();

router.post("/", createLeave);
router.get("/:id", getLeave);
router.get("/", getAllLeaves);
router.put("/:id", updateLeave);
router.delete("/:id", deleteLeave);

module.exports = router;
