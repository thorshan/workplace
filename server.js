require('dotenv').config();

const express = require('express');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database 
const connectDB = require('./config/database');
connectDB();

// Routes
const auth = require("./routes/auth");

// Auth Route
app.use('/api', auth);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));