const express = require('express');
const {
  getUserById,
  getCurrentUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require('../controller/user_controller.js');
const { authenticate } = require('../middleware/auth_middleware.js'); // Ensure this middleware verifies JWT

const router = express.Router();

// Routes for user operations
router.get('/current', authenticate, getCurrentUser); // Get current user
router.get('/:id', authenticate, getUserById); // Get user by ID
router.get('/', authenticate, getAllUsers); // Get all users
router.put('/:id', authenticate, updateUserById); // Update user by ID
router.delete('/:id', authenticate, deleteUserById); // Delete user by ID

module.exports = router;
