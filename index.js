const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require("./src/routes/auth_routes.js"); // Import the userRoutes
const connectDB = require("./src/database/db.js")

dotenv.config();

const app = express();

connectDB();
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes); // Prefix routes with /api/users



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
