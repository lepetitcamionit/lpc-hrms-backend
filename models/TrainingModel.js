const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  trainer: { type: String, required: true },
  place: { type: String, required: true },
  status: {
    type: String,
    enum: ["completed", "in progress", "upcoming"],
    default: "upcoming",
  },
});

module.exports = mongoose.model("Training", trainingSchema);
