const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require("./src/routes/auth_routes.js"); // Import the userRoutes
const userRoutes = require("./src/routes/user_routes.js"); // Import the userRoutes
const connectDB = require("./src/database/db.js")

dotenv.config();

const app = express();

connectDB();
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes); // Prefix routes with /api/users

app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
