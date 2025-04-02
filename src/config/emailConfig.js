require("dotenv").config();

module.exports = {
  host: "smtp.gmail.com", // Ensure this is correct for your email provider
  port: 587, // Use 465 for SSL, 587 for TLS
  secure: false, // Use "true" if using SSL (port 465)
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your app-specific password
  },
  tls: {
    rejectUnauthorized: false, // Prevent TLS verification issues
  },
};
