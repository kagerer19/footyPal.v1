import {db} from "../config/firebaseConfig";
import { Request, Response, NextFunction } from "express";
import firebase from 'firebase/compat/app';
import { Location } from "../models/Location";
import { Geolocation } from "../models/GeoLocation";

const COLLECTION_NAME = 'locations';

exports.createLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, address, pitchid, latitude, longitude } = req.body;

        if (!name || !address || typeof pitchid !== 'number' || typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ success: false, message: "Invalid coordinates" });
        }

        const coordinates: Geolocation = { latitude, longitude };

        const locationData: Location = {
            pitchid,
            name,
            address,
            coordinates
        };

        const locationDoc = await db.collection(COLLECTION_NAME).add(locationData);

        res.status(201).json({
            success: true,
            location: {
                id: locationDoc.id,
                ...locationData
            }
        });
    } catch (error) {
        next(error);
    }
};

// Show all Locations
exports.showLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const locationsSnapshot = await db.collection(COLLECTION_NAME).get();
        const locations = locationsSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                pitchid: data.pitchid,
                name: data.name,
                address: data.address,
                coordinates: {
                    latitude: data.coordinates.latitude,
                    longitude: data.coordinates.longitude
                }
            } as Location;
        });

        res.status(200).json({
            success: true,
            locations
        });
    } catch (error) {
        next(error);
    }
};

// Get a single Location
exports.showLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationId = req.params.locationid;

        const locationSnapshot = await db.collection(COLLECTION_NAME).doc(locationId).get();

        if (!locationSnapshot.exists) {
            return res.status(404).json({
                success: false,
                message: "Location not found."
            });
        }

        const retrievedLocation = locationSnapshot.data();
        if (!retrievedLocation) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve location data."
            });
        }

        return res.status(200).json({
            success: true,
            location: {
                id: locationId,
                ...retrievedLocation,
                coordinates: {
                    latitude: retrievedLocation.coordinates.latitude,
                    longitude: retrievedLocation.coordinates.longitude
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update Location
exports.updateLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationId = req.params.locationid;
        const { name, address, pitchid, latitude, longitude } = req.body;

        if (typeof pitchid !== 'number' || isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ success: false, message: "Invalid coordinates or pitchid" });
        }

        const coordinates: Geolocation = { latitude, longitude };

        const updatedLocation: Location = {
            pitchid,
            name,
            address,
            coordinates
        };

        await db.collection(COLLECTION_NAME).doc(locationId).update(updatedLocation);

        res.status(200).json({
            success: true,
            location: {
                id: locationId,
                ...updatedLocation
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete Location
exports.deleteLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationId = req.params.locationid;

        const locationSnapshot = await db.collection(COLLECTION_NAME).doc(locationId).get();

        if (!locationSnapshot.exists) {
            return res.status(404).json({
                success: false,
                message: "Location not found."
            });
        }

        await db.collection(COLLECTION_NAME).doc(locationId).delete();

        res.status(200).json({
            success: true,
            message: "Location deleted."
        });
    } catch (error) {
        next(error);
    }
};
