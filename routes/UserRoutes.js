const express = require("express");
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
