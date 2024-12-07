const express = require("express");
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
router.get("/", getAllRoles);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
