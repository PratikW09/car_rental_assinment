const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require("./src/routes/auth_routes.js"); 
const userRoutes = require("./src/routes/user_routes.js"); 
const connectDB = require("./src/database/db.js")
const cors = require("cors");

dotenv.config();

const app = express();

connectDB();
// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allows cookies and authentication headers
}));

// Routes
app.use('/api/auth', authRoutes); 

app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
