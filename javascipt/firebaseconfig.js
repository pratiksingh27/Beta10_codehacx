import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import {ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyAmHc96ZEP5fc_SCj__qH8kJViQvhABBH8",
    authDomain: "castly-22cb4.firebaseapp.com",
    projectId: "castly-22cb4",
    storageBucket: "castly-22cb4.appspot.com",
    messagingSenderId: "644333312450",
    appId: "1:644333312450:web:a18e3b5cad797012219e5b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storageRef = ref;