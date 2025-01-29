const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return this.isNew || this.isModified("password")
            ? val === this.password
            : true;
        },
        message: "Password & Confirm Password does not match",
      },
    },
    name: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    salary: { type: Number },
    passportNumber: { type: String },
    qidNumber: { type: String },
    dateOfBirth: { type: Date },
    contactNumber: { type: String },
    familyContactNumber: { type: String },
    nationality: { type: String },
    joiningDate: { type: Date },
    probationEvalConfirmDate: { type: Date },
    isResigned: { type: Boolean, default: false },
    resignedDate: { type: Date },
    warningLetterCount: { type: Number, default: 0 },
    healthcardStartDate: { type: Date },
    healthcardNumber: { type: String },
    FHCStartDate: { type: Date }, //foodHandlerCertificateStartDate
    passwordChangedAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isUserDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip hashing if password is not modified
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined; // Prevent saving confirmPassword to DB
  next();
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

// Middleware to update `passwordChangedAt` field
userSchema.pre("save", function (next) {
  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000; // Ensure token issuance is after password change
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
