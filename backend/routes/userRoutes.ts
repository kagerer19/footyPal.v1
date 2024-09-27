const express = require("express");
const router = express.Router();
const {signup, signin, signout, getAllUsers, getUser, updateUser, deleteUser} = require("../services/userService")

//auth routes
// api/signup
router.post('/signup', signup)

// api/signin
router.get('/signin', signin)

// api/signout
router.get('/signout', signout)

// api/allusers
router.get('/allusers', getAllUsers)

// api/user/:userID
router.get('/user/:userID', getUser)

// /api/user/update/:userID
router.put('/user/update/:userID', updateUser)

// /api/user/delete/:userID
router.delete('/user/delete/:userID', deleteUser)

module.exports = router