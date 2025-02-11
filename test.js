import { db } from "./firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function registerUser(event) {
    event.preventDefault(); // Prevents the form from submitting normally

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Add user data to Firestore
        const docRef = await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            password: password,
            timestamp: new Date()
        });
        console.log("✅ User registered successfully - Doc ID:", docRef.id);
    } catch (error) {
        console.error("❌ Error registering user:", error);
    }
}

// Add event listener to the form
const form = document.getElementById("register-form");
form.addEventListener("submit", registerUser);
