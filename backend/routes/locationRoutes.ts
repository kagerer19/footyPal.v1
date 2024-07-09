const express = require("express");
const router = express.Router();
const { showLocations, createLocation, deleteLocation, updateLocation, showLocation } = require("../services/locationService");

// Location routes
//  api/locations/all
router.get('/locations/all', showLocations);

//  api/locations/:locationid
router.get('/locations/:locationid', showLocation);

//  api/locations/create
router.post('/locations/create', createLocation);

//  api/locations/delete/:locationid
router.delete('/locations/:locationid', deleteLocation);

//  api/locations/update/:locationid
router.put('/locations/update/:locationid', updateLocation);

module.exports = router;

