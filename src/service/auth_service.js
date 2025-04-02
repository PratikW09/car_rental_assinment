const bcrypt = require('bcryptjs');
const User = require('../model/user');
const { generateAccessToken } = require('../utils/jwt_utils');
const { generateOtp, isOtpValid } = require('../utils/otpUtils');
const { sendEmail } = require('../utils/emailUtils');

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
});

// Register a new user
const registerUser = async (name, email, mobile, password) => {
  try {
    if ([name, email, mobile, password].some(field => !field?.trim())) {
      return { status: 400, data: { message: "All fields are required" } };
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

    if (existingUser) {
      const conflictField = existingUser.email === email ? "email" : "mobile number";
      return { status: 409, data: { message: `User with this ${conflictField} already exists` } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, mobile, password: hashedPassword });

    if (!user) {
      return { status: 500, data: { message: "Something went wrong while registering the user" } };
    }

    const token = generateAccessToken(user);
    const createdUser = user.toObject();
    delete createdUser.password;

    return {
      status: 201,
      token,
      cookieOptions: getCookieOptions(),
      data: { message: "User Created Successfully", user: createdUser, token },
    };
  } catch (error) {
    console.error("Error in registerUser:", error);
    return { status: 500, data: { message: "Internal Server Error" } };
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    if ([email, password].some(field => !field?.trim())) {
      return { status: 400, data: { message: "Email and password are required" } };
    }

    const user = await User.findOne({ email });

    if (!user) {
      return { status: 404, data: { message: "User not found" } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 401, data: { message: "Invalid credentials" } };
    }

    const token = generateAccessToken(user);
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    };

    return {
      status: 200,
      token,
      cookieOptions: getCookieOptions(),
      data: { message: "Login successful", user: userData, token },
    };
  } catch (error) {
    console.error("Error in loginUser:", error);
    return { status: 500, data: { message: "Internal Server Error" } };
  }
};

// Logout user
const logoutUser = async () => {
  return {
    status: 200,
    cookieOptions: getCookieOptions(),
    clearCookie: true,
    data: { message: "Logout successful" },
  };
};

// Send OTP for authentication
const sendOtp = async (email) => {
  try {
    if (!email) {
      return { status: 400, data: { message: "Email is required" } };
    }

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    const usernew = await user.save();

    const res = await sendEmail(email, otp);
    return { status: 200, data: { message: "OTP sent successfully" } };
  } catch (error) {
    console.error("Error in sendOtp:", error);
    return { status: 500, data: { message: "Failed to send OTP" } };
  }
};

// Verify OTP and login
const verifyOtp = async (email, otp) => {
  try {
    if (!email || !otp) {
      return { status: 400, data: { message: "Email and OTP are required" } };
    }

    const user = await User.findOne({ email });

    if (!user || !isOtpValid(user.otp, user.otpExpiry) || user.otp !== otp) {
      return { status: 400, data: { message: "Invalid or expired OTP" } };
    }

    const token = generateAccessToken(user);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return {
      status: 200,
      data: { message: "Login successful", token },
    };
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return { status: 500, data: { message: "Internal Server Error" } };
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  sendOtp,
  verifyOtp,
};
