const Leave = require("../models/LeaveModel");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

exports.uploadFile = upload.single("file");

exports.createLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, type } = req.body;

    console.log("req.file.originalname")

    // if (!employeeId || !startDate || !endDate || !type) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }

    // Create leave request with uploaded file
    const leaveData = {
      employeeId,
      startDate,
      endDate,
      type,
      document: req.file ? req.file.path : null,
    };

    const leave = await Leave.create(leaveData);
    res.status(201).json({ message: "Leave request created", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.status(200).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.status(200).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
