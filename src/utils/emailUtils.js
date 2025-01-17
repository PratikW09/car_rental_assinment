const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
