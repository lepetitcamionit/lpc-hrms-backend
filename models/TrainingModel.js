const trainingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  trainer: { type: String, required: true },
  status: {
    type: String,
    enum: ["completed", "in progress", "upcoming"],
    required: true,
  },
});

module.exports = mongoose.model("Training", trainingSchema);
