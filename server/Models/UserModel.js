const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  dateOfBirth: { type: Date, required: true },
  bio: { type: String },
  userType: { type: String, required: true },
  contactNumber: { type: String },
  city: { type: String },
  hospital: { type: String },
  // certificate: { type: String },
  profilePicture: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false }, // Add this field
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// userSchema.pre("save", async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });

module.exports = mongoose.model("User", userSchema);
