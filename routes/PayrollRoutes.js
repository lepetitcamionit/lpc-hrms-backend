const express = require("express");
const {
  createPayroll,
  getPayroll,
  getAllPayrolls,
  updatePayroll,
  deletePayroll,
  getPayrollByEmployee,
} = require("../controllers/PayrollController");

const router = express.Router();

router.post("/", createPayroll);
router.get("/:id", getPayroll);
router.get("/employee/:employeeId", getPayrollByEmployee);
router.get("/", getAllPayrolls);
router.patch("/:id", updatePayroll);
router.delete("/:id", deletePayroll);

module.exports = router;
