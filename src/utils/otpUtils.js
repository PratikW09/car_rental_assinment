const crypto = require('crypto');

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const isOtpValid = (otp, expiry) => {
  return otp && expiry && expiry > new Date();
};

module.exports = { generateOtp, isOtpValid };
