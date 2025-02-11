// register.js
import { db } from "./firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();  // Prevent the default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        name: name,
        email: email,
        password: password,
        timestamp: new Date()
    };

    console.log("✅ Attempting to add user data:", userData);

    try {
        // Add the user data to Firestore in the 'user1' collection
        const docRef = await addDoc(collection(db, "user1"), userData);

        // Log success
        console.log("✅ User registered with ID:", docRef.id);

        // Redirect after successful registration
        window.location.href = "login.html";
    } catch (error) {
        console.error("❌ Error registering user:", error);
    }
});
