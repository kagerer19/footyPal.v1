import { Application } from "express";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

export const app: Application = express();

// Import routes
const gameRoutes = require('./routes/gameRoutes');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');

// Middleware
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({
    limit: "15mb",
    extended: true
}));

// Add morgan for logs
app.use(morgan('combined'));

// Game routes
app.use('/api', gameRoutes);

// Auth routes
app.use('/api', authRoutes);

// Location routes
app.use('/api', locationRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
