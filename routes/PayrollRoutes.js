const express = require("express");
const {
  createPayroll,
  getPayroll,
  getAllPayrolls,
  updatePayroll,
  deletePayroll,
} = require("../controllers/PayrollController");

const router = express.Router();

router.post("/", createPayroll);
router.get("/:id", getPayroll);
router.get("/", getAllPayrolls);
router.put("/:id", updatePayroll);
router.delete("/:id", deletePayroll);

module.exports = router;
