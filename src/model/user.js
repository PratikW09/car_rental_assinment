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
      default: null, 
    },
    otpExpiry: {
      type: Date, 
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'], 
      default: 'user',
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` with unparalleled ease
  }
);

module.exports = mongoose.model('User', UserSchema);
