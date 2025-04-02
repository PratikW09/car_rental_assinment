const express = require('express');
const {
  getUserById,
  getCurrentUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require('../controller/user_controller.js');
const { authorizeRole } = require('../middleware/auth_middleware.js'); // Ensure this middleware verifies JWT

const router = express.Router();

// Routes for user operations
router.get('/me', authorizeRole(["user","admin"]), getCurrentUser); // Get current user
router.get('/:id', authorizeRole(["user","admin"]), getUserById); // Get user by ID
router.get('/', authorizeRole(["user","admin"]), getAllUsers); // Get all users
router.put('/:id', authorizeRole(["user","admin"]), updateUserById); // Update user by ID
router.delete('/:id', authorizeRole(["user","admin"]), deleteUserById); // Delete user by ID

module.exports = router;
