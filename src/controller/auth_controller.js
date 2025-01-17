const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../utils/jwt_utils.js');
const User = require('../model/user.js');

const registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if ([name, mobile, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existedUserByEmail = await User.findOne({ email });
  if (existedUserByEmail) {
    return res.status(409).json({ message: "User with this email already exists" });
  }

  const existedUserByMobile = await User.findOne({ mobile });
  if (existedUserByMobile) {
    return res.status(409).json({ message: "User with this mobile number already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  await user.save();

  // Use the generateAccessToken function to generate the token
  const token = generateAccessToken(user);

  await user.save();

  const createdUser = await User.findById(user._id).select('-password');

  if (!createdUser) {
    return res.status(500).json({ message: "Something went wrong while registering the user" });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
  };

  return res.status(201)
    .cookie('jwt_token', token, cookieOptions)
    .json({
      message: "User Created Successfully",
      user: createdUser,
      token,
    });
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateAccessToken(user);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
  };

  return res.status(200)
    .cookie('jwt_token', token, cookieOptions)
    .json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
};


const logoutUser = async (req, res) => {
  res
    .clearCookie('jwt_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .status(200)
    .json({ message: "Logout successful" });
};




const { generateOtp, isOtpValid } = require('../utils/otpUtils');
const { sendEmail } = require('../utils/emailUtils');

// Generate and send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  let user = await User.findOne({ email });
  if (!user) user = new User({ email });

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  try {
    await sendEmail(email, 'Your OTP for Login', `Your OTP is ${otp}. It is valid for 10 minutes.`);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Verify OTP and generate token
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

  const user = await User.findOne({ email });

  if (!user || !isOtpValid(user.otp, user.otpExpiry) || user.otp !== otp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const token = generateAccessToken(user);
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json({
    message: 'Login successful',
    token,
  });
};


module.exports = {registerUser,loginUser,logoutUser,sendOtp, verifyOtp
  
};
