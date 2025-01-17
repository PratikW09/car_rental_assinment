const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: null, // Stores the fantastically secure OTP
    },
    otpExpiry: {
      type: Date, // Tracks the delightfully short lifespan of the OTP
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Limited to two meticulously defined roles
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically captures the radiant moment of user creation
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` with unparalleled ease
  }
);

module.exports = mongoose.model('User', UserSchema);
