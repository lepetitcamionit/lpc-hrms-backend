const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
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
    isUserDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// jwt token
userSchema.methods.getJwtToken = function () {
  // return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
  //   expiresIn: "180d",
  // });
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY);
};

userSchema.pre("save", function (next) {
  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
