import { Application } from "express";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
export const app: Application = express();

// Import routes
const showGamesRoute = require('./routes/gameRoutes');
const createGameRoute = require('./routes/gameRoutes');
const deleteGameRoute = require('./routes/gameRoutes');
const updateGameRoute = require('./routes/gameRoutes');
const showGameRoute = require('./routes/gameRoutes');
const showSignUpRoute = require('./routes/userRoutes');
const showSignInRoute = require('./routes/userRoutes');
const showSignOutRoute = require('./routes/userRoutes');
const showUsersRoute = require('./routes/userRoutes');
const showSingleUserRoute = require('./routes/userRoutes');
const showUpdateUserRoute = require('./routes/userRoutes');
const showDeleteUserRoute = require('./routes/userRoutes');

// Import locationRouts
const locationRoutes = require('./routes/locationRoutes');

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
app.use('/api', showSignUpRoute)
app.use('/api', showSignInRoute)
app.use('/api', showSignOutRoute)
app.use('/api', showUsersRoute)
app.use('/api', showSingleUserRoute)
app.use('/api', showUpdateUserRoute)
app.use('/api', showDeleteUserRoute)
app.use('/api', locationRoutes);


 const port = 8000 || 9000
 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

 module.exports = app


