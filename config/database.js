require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB is connected on host : ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;