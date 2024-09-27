// !TODO Add email verification on sign up
// !TODO Add password reset

import {adminDb, adminAuth, db, auth, signInWithEmailAndPassword} from '../config/firebaseConfig';
import {Request, Response, NextFunction} from 'express';
import ErrorResponse from "../utils/errorResponse";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {User} from "../models/User";

const COLLECTION_NAME = "users"

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password, displayName} = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400));
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await adminAuth.updateUser(userCredential.user.uid, {displayName});

        // Map credentials for User is firestore collections
        const user: User = {
            uuid: userCredential.user.uid,
            username: req.body.displayName,
            email: req.body.email,
            favouredlocation: req.body.favouredlocation,
            favouredposition: req.body.favouredposition,
            ishometeam: false
        }

        res.status(201).json({
            success: true,
            user: user
        });

        //Add user to collection
        const userDoc = await db.collection(COLLECTION_NAME).add(user)

    } catch (error) {
        next(error);
    }
};

exports.signin = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if (!email) {
        return next(new ErrorResponse("Please add an email", 403));
    }
    if (!password) {
        return next(new ErrorResponse("Please add a password", 403));
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        const userRecord = await adminAuth.getUserByEmail(email);

        res.status(200)
            .cookie('token', idToken, {maxAge: 60 * 60 * 1000, httpOnly: true})
            .json({success: true, token: idToken, user: userRecord});
    } catch (error) {
        next(new ErrorResponse("Invalid credentials", 400));
    }
};

exports.signout = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    try {
        if (!idToken) {
            throw new Error('Authorization token not provided.');
        }

        await adminAuth.revokeRefreshTokens(idToken);

        res.status(200).json({message: 'User signed out successfully.'});
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await db.collection(COLLECTION_NAME).get()
        const users: User[] = allUsers.docs.map(doc => {
            const data = doc.data()
            return {
                userID: doc.id,
                uuid: data.uuid,
                username: data.username,
                email: data.email,
                favouredlocation: data.favouredlocation,
                favouredposition: data.favouredposition,
                ishometeam: data.ishometeam
            }
        }) as User[];

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID
        const ID = await db.collection(COLLECTION_NAME).doc(userID).get()

        if (!ID.exists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const retrievedUser = ID.data()

        return res.status(200).json({
            success: true,
            retrievedUser
        });
    } catch (ErrorResponse) {
        console.error("Error caught in get user:", ErrorResponse);
        next(ErrorResponse);
    }
};

exports.updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID

        const updatedUserData: User = {
            username: req.body.username,
            email: req.body.email,
            favouredlocation: req.body.favouredlocation,
            favouredposition: req.body.favouredposition,
            ishometeam: false
        }

        const ID = await db.collection(COLLECTION_NAME).doc(userID).update(updatedUserData)

        return res.status(200).json({
            success: true,
            updatedUserData
        });
    } catch (ErrorResponse) {
        console.error("Error caught in updating user:", ErrorResponse);
        next(ErrorResponse);
    }
};

exports.deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID;
        const user = await db.collection(COLLECTION_NAME).doc(userID).get();

        if (!user.exists) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        await db.collection(COLLECTION_NAME).doc(userID).delete();
        res.status(200).json({
            success: true,
            message: "User deleted."
        })
    } catch (ErrorResponse) {
        next(ErrorResponse);
    }
}


// User services !TODO

// DONE Get users
// DONE Get user
// DONE update user
// DONE delete user

// User services Additions !TODO

// Add new parameters to the user data model
// integrate with bookings and teams
// new model:

// User {
//     userid: number;
//     username: string;
//     email: string;
//     teamId: number || null;
//      bookingId: number || null;
//      ishometeam: boolean || null;
//      favouredlocation: number;
//      favouredposition: string;
//    }
//  }