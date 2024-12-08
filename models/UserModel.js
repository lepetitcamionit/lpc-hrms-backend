const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "Password & Confirm Password does not match",
    },
  },
  name: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  salary: { type: Number, required: true },
  joiningDate: { type: Date, required: true },
  isResigned: { type: Boolean, default: false },
  resignedDate: { type: Date },
  qidNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  familyContactNumber: { type: String },
  nationality: { type: String, required: true },
  warningLetterCount: { type: Number, default: 0 },
  healthcardStartDate: { type: Date },
  healthcardNumber: { type: String },
  FHCStartDate: { type: Date }, //foodHandlerCertificateStartDate
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isUserDeleted: { type: Boolean, default: false },
});

// jwt token
userSchema.methods.getJwtToken = function () {
  // return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
  //   expiresIn: "180d",
  // });
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY);
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Forgot password
userSchema.methods.getResetToken = function () {
  // Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  console.log("resetToken", resetToken);
  console.log("resetPasswordToken", this.resetPasswordToken);
  console.log("resetPasswordExpires", this.resetPasswordExpires);

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
