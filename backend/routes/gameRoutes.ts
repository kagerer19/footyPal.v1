const express = require("express");
const router = express.Router();
const {showGames, createGame, deleteGame, updateGame, showGame} = require("../services/gamesService");


//Games routes
//  api/games/all
router.get('/games/all', showGames)

//  api/games/:gameid
router.get('/games/:gameid', showGame)

//  api/games/create
router.post('/games/create', createGame)

//  api/games/delete/:gameid
router.delete('/games/:gameid', deleteGame)

//  api/games/update/:gameid
router.put('/games/update/:gameid', updateGame)

module.exports = router