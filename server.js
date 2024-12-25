const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require('dotenv').config();
const cors = require("cors"); // Import CORS

const app = express();
connectDb();
const port = 5000;

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
