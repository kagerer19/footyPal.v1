import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/auth';

require('dotenv').config();

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

// // Connect to emulator if in development mode
// if (process.env.NODE_ENV === 'development') {
//   db.useEmulator('localhost', 8080);
// }

export default db;
