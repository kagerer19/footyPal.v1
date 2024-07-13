import {db} from "../config/firebaseConfig";
import { Request, Response, NextFunction } from "express";
import firebase from 'firebase/compat/app';
import { Location } from "../models/Location";


const COLLECTION_NAME = 'locations';


exports.createLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        console.log("Received request body:", req.body);

        if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
            console.log("Invalid input data:", { name, address, latitude, longitude });
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        if (isNaN(latitude) || isNaN(longitude)) {
            console.log("Invalid coordinates:", { latitude, longitude });
            return res.status(400).json({ success: false, message: "Invalid coordinates" });
        }

        const coordinates = new firebase.firestore.GeoPoint(latitude, longitude);

        const locationData = {
            LocationName: name,
            LocationAddress: address,
            LocationsCoordinates: coordinates
        };

        console.log("Location Data to be added:", locationData);

        const locationDoc = await db.collection(COLLECTION_NAME).add(locationData);

        console.log("Document added with ID:", locationDoc.id);

        res.status(201).json({
            success: true,
            location: {
                id: locationDoc.id,
                ...locationData
            }
        });
    } catch (error) {
        console.error("Error creating location:", error);
        next(error);
    }
};


// Show all Locations
exports.showLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Fetch all documents from the Firestore collection
        const locationsSnapshot = await db.collection(COLLECTION_NAME).get();
        const locations = locationsSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                LocationName: data.LocationName,
                LocationAddress: data.LocationAddress,
                LocationsCoordinates: data.LocationsCoordinates
            };
        });

        // Respond with the fetched locations
        res.status(200).json({
            success: true,
            locations
        });
    } catch (ErrorResponse) {
        next(ErrorResponse); // Pass error to error handling middleware
    }
};

// Get a single Location
exports.showLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract location ID from request parameters
        const locationId = req.params.locationid;

        // Fetch the document from Firestore using the location ID
        const locationSnapshot = await db.collection(COLLECTION_NAME).doc(locationId).get();

        // Check if the document exists
        if (!locationSnapshot.exists) {
            return res.status(404).json({
                success: false,
                message: "Location not found."
            });
        }

        // Respond with the fetched location data
        const retrievedLocation = locationSnapshot.data();
        return res.status(200).json({
            success: true,
            location: {
                id: locationId, // Include the document ID in the response
                ...retrievedLocation
            }
        });
    } catch (ErrorResponse) {
        next(ErrorResponse); // Pass error to error handling middleware
    }
};

// Update Location
exports.updateLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract location ID from request parameters
        const locationId = req.params.locationid;

        // Extract and validate input data
        const name: string = req.body.name;
        const address: string = req.body.address;
        const coordinatesArray: string[] = req.body.coordinates.split(',');
        const latitude: number = parseFloat(coordinatesArray[0]);
        const longitude: number = parseFloat(coordinatesArray[1]);

        // Validate coordinates
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ success: false, message: "Invalid coordinates" });
        }

        // Create GeoPoint object using firebase.firestore.GeoPoint
        const coordinates = new firebase.firestore.GeoPoint(latitude, longitude);

        // Prepare updated location data
        const updatedLocation = {
            LocationName: name,
            LocationAddress: address,
            LocationsCoordinates: coordinates
        };

        // Update the document in Firestore
        await db.collection(COLLECTION_NAME).doc(locationId).update(updatedLocation);

        // Fetch the updated document to verify existence
        const existingLocation = await db.collection(COLLECTION_NAME).doc(locationId).get();
        if (!existingLocation.exists) {
            return res.status(404).json({
                success: false,
                message: 'Location not found',
            });
        }

        // Respond with the updated location data
        res.status(200).json({
            success: true,
            location: {
                id: locationId, // Include the document ID in the response
                ...updatedLocation
            }
        });
    } catch (ErrorResponse) {
        next(ErrorResponse); // Pass error to error handling middleware
    }
};

// Delete Location
exports.deleteLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract location ID from request parameters
        const locationId = req.params.locationid;

        // Fetch the document from Firestore using the location ID
        const locationSnapshot = await db.collection(COLLECTION_NAME).doc(locationId).get();

        // Check if the document exists
        if (!locationSnapshot.exists) {
            return res.status(404).json({
                success: false,
                message: "Location not found."
            });
        }

        // Delete the document from Firestore
        await db.collection(COLLECTION_NAME).doc(locationId).delete();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Location deleted."
        });
    } catch (ErrorResponse) {
        next(ErrorResponse); // Pass error to error handling middleware
    }
};
