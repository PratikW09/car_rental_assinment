const nodemailer = require("nodemailer");
require("dotenv").config();
const emailConfig = require("../config/emailConfig");

/**
 * Sends an email with the provided OTP.
 * @param {string} to - Recipient email address.
 * @param {string} otp - One-Time Password to be sent.
 * @returns {Promise<{ success: boolean, message: string, error?: any }>}
 */
const sendEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.EMAIL, // Sender email from .env
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    html: `<p>Your OTP code is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent successfully to ${to}`);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP", error };
  }
};

module.exports = { sendEmail };
