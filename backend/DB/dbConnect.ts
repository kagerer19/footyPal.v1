/**
 * Database Functions (WIP)
 * !TODO add DB functions Could be a class???
 * @param {Type} paramName - Description of the parameter.
 * @returns {Type} Description of the return value.
 */


require('dotenv').config();
const mongoose = require('mongoose');

// database connection string
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// Configure Mongoose options
mongoose.set("strictQuery", true);

export const connectDB = async () => {
    try {
        await mongoose.connect(dbConnectionString);
        console.log("MongoDB is Connected!");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err); // Log the error for debugging
        process.exit(1); // Exit the process if connection fails
    }
};
