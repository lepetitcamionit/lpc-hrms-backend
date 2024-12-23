const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shiftSchema = new Schema({
  shiftId: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  branchId: { type: String, required: true, ref: "Branch" },
});

module.exports = mongoose.model("Shift", shiftSchema);
