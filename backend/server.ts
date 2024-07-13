import {Application} from "express";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan")
export const app:Application = express();

// Import routes
const showGamesRoute = require('./routes/gameRoutes');
const createGameRoute = require('./routes/gameRoutes');
const deleteGameRoute = require('./routes/gameRoutes');
const updateGameRoute = require('./routes/gameRoutes');
const showGameRoute = require('./routes/gameRoutes');

// Import locationRouts
const createLocationRoute = require('./routes/locationRoutes');
const showLocationsRoute = require('./routes/locationRoutes');
const showLocationRoute = require('./routes/locationRoutes');
const deleteLocationRoute = require('./routes/locationRoutes');
const updateLocationRoute = require('./routes/locationRoutes');

//!TODO Add cors

// Middleware
app.use(bodyParser.json({limit: "15mb"}));
app.use(bodyParser.urlencoded({
    limit: "15mb",
    extended: true
}));

// add morgan for logs
app.use(morgan('combined'));
app.use('/api', showGamesRoute)
app.use('/api', createGameRoute)
app.use('/api', deleteGameRoute)
app.use('/api', updateGameRoute)
app.use('/api', showGameRoute)

app.use('/api', createLocationRoute)
app.use('/api', showLocationsRoute)
app.use('/api', showLocationRoute)
app.use('/api', deleteLocationRoute)
app.use('/api', updateLocationRoute)

 const port = 8000 || 9000
 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

 module.exports = app


