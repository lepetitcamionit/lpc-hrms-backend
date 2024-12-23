const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createRole,
  getRole,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/RoleController");

const router = express.Router();

router.post("/", createRole);
router.get("/:id", getRole);
router.get("/", isAuthenticatedUser, getAllRoles);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
