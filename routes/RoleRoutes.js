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

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  createRole
);
router.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  getRole
);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  getAllRoles
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  updateRole
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteRole
);

module.exports = router;
