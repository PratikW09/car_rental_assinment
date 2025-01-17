// utils/tokenUtils.js
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
      { 
        userId: user._id, // Add the user's ID
        email: user.email, // Add the user's email
        role: user.role // Add the user's role
      }, 
      process.env.JWT_ACCESS_SECRET, 
      { expiresIn: '1h' } // Set token expiration time
    );
  };

// Verify the access token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return null; // Return null if token is invalid or expired
  }
};

module.exports = { generateAccessToken, verifyToken };
