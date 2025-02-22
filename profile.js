import { db, doc, getDoc, setDoc, auth } from "firebaseconfig.js"; 
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
    const fields = document.querySelectorAll("input, select");
    const saveBtn = document.getElementById("save-btn");
    const progressBar = document.getElementById("progress");

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const displayName = document.getElementById("display-name");
    const displayEmail = document.getElementById("display-email");

    // ✅ Check for logged-in user
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userId = user.uid;
            
            // ✅ Store UID in Local Storage for persistent login
            localStorage.setItem("userUID", userId);
            localStorage.setItem("userEmail", user.email);

            console.log("✅ Logged in as:", user.email);

            // Fetch user profile data from Firestore
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();

                // ✅ Fill Name & Email Fields
                nameField.value = userData.fullName || "N/A";
                emailField.value = userData.email || user.email;

                // ✅ Display beside profile picture
                displayName.textContent = userData.fullName || "User";
                displayEmail.textContent = userData.email || user.email;

                // ✅ Lock name & email fields
                nameField.setAttribute("readonly", true);
                emailField.setAttribute("readonly", true);

                // ✅ Fill other fields
                fields.forEach(field => {
                    if (userData[field.id] && field !== nameField && field !== emailField) {
                        field.value = userData[field.id];
                    }
                });

                updateProgress();
            } else {
                console.log("⚠️ No profile data found. New user?");
            }
        } else {
            console.log("⚠️ No user logged in.");
            localStorage.removeItem("userUID");  // ✅ Remove UID from Local Storage
            window.location.href = "login.html"; // Redirect if not logged in
        }
    });

    // ✅ Function to calculate profile completion percentage
    function updateProgress() {
        let filledFields = 0;
        fields.forEach(field => {
            if (field.value.trim() !== "") filledFields++;
        });

        const completion = Math.round((filledFields / fields.length) * 100);
        progressBar.style.width = `${completion}%`;
        progressBar.textContent = `${completion}% Completed`;
    }

    // ✅ Save user data to Firestore
    saveBtn.addEventListener("click", async function () {
        const userId = localStorage.getItem("userUID");  // Retrieve UID from storage

        if (!userId) {
            alert("⚠️ You need to be logged in to save your profile.");
            return;
        }

        let userData = {};

        fields.forEach(field => {
            if (field.value.trim() !== "" && field !== nameField && field !== emailField) {
                userData[field.id] = field.value;
            }
        });

        try {
            await setDoc(doc(db, "users", userId), userData, { merge: true });
            alert("✅ Profile saved successfully!");
            updateProgress();
        } catch (error) {
            console.error("❌ Error saving data:", error);
        }
    });
});
