import admin, { ServiceAccount } from 'firebase-admin';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
require('dotenv').config();

const serviceAccountPath: string = process.env.SERVICE_ACCOUNT_KEY_PATH || "";
const serviceAccount: ServiceAccount = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASEURL,
});

// Initialize the Firebase Client SDK
const firebaseApp = firebase.initializeApp({
    apiKey: process.env.API_KEY_MM,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
});

const db = firebaseApp.firestore();
const adminDb = admin.firestore();
const adminAuth = admin.auth();
const auth = getAuth(firebaseApp);  // Get authentication from the client SDK

export { adminDb, adminAuth, db, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
