import { auth } from "./firebaseconfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { showPopup } from "./popup.js";  // ✅ Import popup

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        showPopup("✅ Login Successful!", true, `homepage.html?uid=${user.uid}`);
        console.log("✅ User logged in:", user.email);

    } catch (error) {
        console.error("❌ Error logging in:", error);
        showPopup("❌ Login failed, Invalid Credentials", false);
    }
}

document.getElementById("login-form").addEventListener("submit", loginUser);
