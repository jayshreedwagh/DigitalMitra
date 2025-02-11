import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAUkNjkeVbxCKPi8ySPcKLe8csRejc2T4",
    authDomain: "digitalmitra-c053e.firebaseapp.com",
    projectId: "digitalmitra-c053e",
    storageBucket: "digitalmitra-c053e.appspot.com",
    messagingSenderId: "134256571844",
    appId: "1:134256571844:web:77c94e146a164998296091"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase Initialized:", app);
console.log("✅ Firestore Connected:", db);

export { db, collection, addDoc };
