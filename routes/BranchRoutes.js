const express = require("express");
const {
  createBranch,
  getBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
} = require("../controllers/BranchController");

const router = express.Router();

router.post("/", createBranch);
router.get("/:id", getBranch);
router.get("/", getAllBranches);
router.patch("/:id", updateBranch);
router.delete("/:id", deleteBranch);

module.exports = router;
