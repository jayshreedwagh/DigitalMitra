import { auth } from "./firebaseconfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

async function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Firebase Auth sign-in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert("✅ Login Successful!");
        console.log("✅ User logged in:", user.email);

        // Redirect to dashboard
        window.location.href = "dashboard.html";  // Change to your actual page

    } catch (error) {
        console.error("❌ Error logging in:", error);
        alert("❌ Login failed: " + error.message);
    }
}

// Attach event listener to login form
document.getElementById("login-form").addEventListener("submit", loginUser);
