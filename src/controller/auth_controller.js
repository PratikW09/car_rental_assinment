const authService = require('../service/auth_service.js');

const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const response = await authService.registerUser(name, email, mobile, password);
    return res.status(response.status).cookie('jwt_token', response.token, response.cookieOptions).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await authService.loginUser(email, password);
    return res.status(response.status).cookie('jwt_token', response.token, response.cookieOptions).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res.clearCookie('jwt_token', authService.getCookieOptions()).status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.sendOtp(email);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await authService.verifyOtp(email, otp);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, sendOtp, verifyOtp };
