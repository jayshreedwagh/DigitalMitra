import { auth,db } from "./firebaseconfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { showPopup } from "./popup.js";  // ✅ Import popup

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        localStorage.setItem("userUID", user.uid);
        localStorage.setItem("userEmail", user.email);
        console.log("✅ User logged in:", user.email);

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Assuming the first match is correct
            localStorage.setItem("userDocId", userDoc.id);
            console.log("✅ User document ID stored:", userDoc.id);
        } else {
            console.log("⚠️ No Firestore document found for this user.");
            localStorage.removeItem("userDocId"); // Clear if not found
        }

        showPopup("✅ Login Successful!", true, `homepage.html?uid=${user.uid}`);

    } catch (error) {
        console.error("❌ Error logging in:", error);
        showPopup("❌ Login failed, Invalid Credentials", false);
    }
}


document.getElementById("login-form").addEventListener("submit", loginUser);
