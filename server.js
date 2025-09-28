require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
const cors = require('cors');
app.use(cors());


// Database 
const connectDB = require('./config/database');
connectDB();

// Routes
const auth = require("./routes/auth");
const department = require('./routes/deparment');
const employee = require('./routes/employee');

// Auth Route
app.use('/api', auth);
app.use('/api', department);
app.use('/api', employee);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));