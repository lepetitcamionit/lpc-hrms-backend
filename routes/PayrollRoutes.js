const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createPayroll,
  getPayroll,
  getAllPayrolls,
  updatePayroll,
  deletePayroll,
  getPayrollByEmployee,
} = require("../controllers/PayrollController");

const router = express.Router();

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "accountant"),
  createPayroll
);
router.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "accountant"),
  getPayroll
);
router.get("/employee/:employeeId", isAuthenticatedUser, getPayrollByEmployee);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "accountant"),
  getAllPayrolls
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "accountant"),
  updatePayroll
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "accountant"),
  deletePayroll
);

module.exports = router;
