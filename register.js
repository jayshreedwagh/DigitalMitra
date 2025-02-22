import { auth, db } from "./firebaseconfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { showPopup } from "./popup.js";  // ✅ Import popup

async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

     try {
        // 🔍 Check if username already exists
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", "==", name));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showPopup("❌ Username already taken! Choose a different one.", false);
            return;
        }

        // ✅ Register user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Store user details in Firestore
        await addDoc(usersRef, {
            uid: user.uid,
            name: name,
            email: email,
            timestamp: new Date()
        });

        showPopup("✅ Registered Successfully!", true, "login.html"); // ✅ Redirect to login after clicking OK
        event.target.reset();

    } catch (error) {
        showPopup("⚠️ Registration failed: " + error.message, false);
    }
}

document.getElementById("register-form").addEventListener("submit", registerUser);
