import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDmPMYBdjbI2vlb0MxIWPtk00hF0iPE-6o",
    authDomain: "jax-chat-7eef6.firebaseapp.com",
    projectId: "jax-chat-7eef6",
    storageBucket: "jax-chat-7eef6.appspot.com",
    messagingSenderId: "654192764185",
    appId: "1:654192764185:web:a3003075c52bd9831c5188"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};