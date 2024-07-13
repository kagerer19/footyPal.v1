const express = require("express");
const router = express.Router();
const {signup, signin, signout} = require("../services/userService")

//auth routes
// api/signup
router.post('/signup', signup)

// api/signin
router.get('/signin', signin)

// api/signout
router.get('/signout', signout)

module.exports = router