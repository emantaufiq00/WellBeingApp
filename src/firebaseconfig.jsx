import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCPDkVNBE3SIwS5E2-EDZI3Gnd0xekS4AU",
    authDomain: "seproj2-8f556.firebaseapp.com",
    projectId: "seproj2-8f556",
    storageBucket: "seproj2-8f556.appspot.com",
    messagingSenderId: "882320675328",
    appId: "1:882320675328:web:397f83761a4458b6763ee5"
});

export default app;
