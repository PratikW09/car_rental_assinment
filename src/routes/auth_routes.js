const express = require("express");
const { registerUser ,loginUser,logoutUser} = require("../controller/auth_controller.js"); // Import registerUser from auth_controller
const { authorizeRole } = require('../middleware/auth_middleware.js');
const { sendOtp, verifyOtp } = require('../controller/auth_controller.js');

const router = express.Router();

// Define the route for user registration
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/otp/send', sendOtp);
router.post('/otp/verify', verifyOtp);

// router.get('/admin', authorizeRole(['admin']), (req, res) => {
//     res.status(200).json({ message: "Welcome, Admin!" });
//   });
  
//   // User-only route
//   router.get('/user', authorizeRole(['user']), (req, res) => {
//     res.status(200).json({ message: `Welcome, User: ${req.user.userId}` });
//   });
  
//   // Logout route (accessible to authenticated users)
//   router.post('/logout', authorizeRole(['admin', 'user']), logoutUser);




module.exports = router; // Export the router
