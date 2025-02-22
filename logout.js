import { auth } from "firebaseconfig.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.getElementById("logout-btn").addEventListener("click", async function () {
    try {
        await signOut(auth);

        // ✅ Clear Local Storage
        localStorage.removeItem("userUID");
        localStorage.removeItem("userEmail");

        console.log("✅ Logged out!");
        window.location.href = "login.html";  // Redirect to login page
    } catch (error) {
        console.error("❌ Logout failed:", error);
    }
});
