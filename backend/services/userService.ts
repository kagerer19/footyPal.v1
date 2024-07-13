import { adminDb, adminAuth, db, auth, signInWithEmailAndPassword } from '../config/firebaseConfig';
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from "../utils/errorResponse";
import {createUserWithEmailAndPassword} from "firebase/auth";

exports.signup = async (req: Request, res: Response, next:  NextFunction) => {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400));
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await adminAuth.updateUser(userCredential.user.uid, { displayName });

        res.status(201).json({
            success: true,
            user: userCredential.user
        });
    } catch (error) {
        next(error);
    }
};

exports.signin = async (req: Request, res: Response, next:  NextFunction) => {
    const { email, password } = req.body;

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
            .cookie('token', idToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
            .json({ success: true, token: idToken, user: userRecord });
    } catch (error) {
        next(new ErrorResponse("Invalid credentials", 400));
    }
};

exports.signout = async (req: Request, res: Response, next:  NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    try {
        if (!idToken) {
            throw new Error('Authorization token not provided.');
        }

        await adminAuth.revokeRefreshTokens(idToken);

        res.status(200).json({ message: 'User signed out successfully.' });
    } catch (error) {
        next(error);
    }
};