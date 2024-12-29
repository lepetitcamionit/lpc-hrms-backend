const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  roleId: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Role", roleSchema);
