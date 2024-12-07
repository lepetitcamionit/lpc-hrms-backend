const branchSchema = new Schema({
  branchId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

module.exports = mongoose.model("Branch", branchSchema);
