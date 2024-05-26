// import firebase
import * as firebaseFirestore from 'firebase/compat/app';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/auth';

require('dotenv').config()

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.API_KEY_MM,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
});

const db = firebaseApp.firestore();
export default db;

