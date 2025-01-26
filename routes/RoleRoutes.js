const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createRole,
  getRole,
  getAllRoles,
  updateRole,
  softDeleteRole,
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
  // isAuthenticatedUser,
  getRole
);
router.get(
  "/",
  isAuthenticatedUser,
  getAllRoles
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  updateRole
);

// router.patch(

//  // softDeleteRole
// );

router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteRole
);

module.exports = router;
