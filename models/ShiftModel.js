const shiftSchema = new Schema({
  shiftId: { type: String, required: true, unique: true },
  shiftName: { type: String, required: true },
  startTime: { type: String, required: true }, // Example: "09:00"
  endTime: { type: String, required: true }, // Example: "17:00"
  branchId: { type: String, required: true, ref: "Branch" },
});

module.exports = mongoose.model("Shift", shiftSchema);
