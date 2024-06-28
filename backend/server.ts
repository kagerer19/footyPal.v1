import {Application} from "express";

const express = require("express");
const bodyParser = require("body-parser");
export const app:Application = express();

// Import routes
const showGamesRoute = require('./routes/gameRoutes');
const createGameRoute = require('./routes/gameRoutes');
const deleteGameRoute = require('./routes/gameRoutes');
const updateGameRoute = require('./routes/gameRoutes');
const showGameRoute = require('./routes/gameRoutes');

//!TODO Add cors


// Middleware
app.use(bodyParser.json({limit: "15mb"}));
app.use(bodyParser.urlencoded({
    limit: "15mb",
    extended: true
}));

app.use('/api', showGamesRoute)
app.use('/api', createGameRoute)
app.use('/api', deleteGameRoute)
app.use('/api', updateGameRoute)
app.use('/api', showGameRoute)


 const port = 8000 || 9000
 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

 module.exports = app


