const roleSchema = new Schema({
  roleId: { type: String, required: true, unique: true },
  title: { type: String, required: true }, // "admin", "manager", "owner", "barista", "head barista", "supervisor", "cashier", "chef"
  description: { type: String },
});

module.exports = mongoose.model("Role", roleSchema);
