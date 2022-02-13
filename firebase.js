import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider } from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyDmPMYBdjbI2vlb0MxIWPtk00hF0iPE-6o",
    authDomain: "jax-chat-7eef6.firebaseapp.com",
    projectId: "jax-chat-7eef6",
    storageBucket: "jax-chat-7eef6.appspot.com",
    messagingSenderId: "654192764185",
    appId: "1:654192764185:web:a3003075c52bd9831c5188"
};

!getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export {db, auth, provider};