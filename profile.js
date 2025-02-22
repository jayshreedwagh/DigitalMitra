import { db, auth } from "./firebaseconfig.js";  
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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
            const userEmail = user.email;
            
            // ✅ Store Email in Local Storage
            localStorage.setItem("userEmail", userEmail);

            console.log("✅ Logged in as:", userEmail);

            // ✅ Fetch user profile data from Firestore
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0]; // ✅ Get the first matching document
                const userData = docSnap.data();
                console.log("✅ User data found:", userData);

                // ✅ Fill Name & Email Fields
                nameField.value = userData.name || "N/A";
                emailField.value = userData.email || userEmail;

                // ✅ Display beside profile picture
                displayName.textContent = userData.name || "User";
                displayEmail.textContent = userData.email || userEmail;

                // ✅ Lock name & email fields
                nameField.setAttribute("disabled", true);
                emailField.setAttribute("disabled", true);

                // ✅ Fill other fields
                fields.forEach(field => {
                    if (userData[field.id] && field !== nameField && field !== emailField) {
                        field.value = userData[field.id];
                    }
                });

                updateProgress();
            } else {
                console.log("⚠️ No profile data found for email:", userEmail);
            }
        } else {
            console.log("⚠️ No user logged in.");
            localStorage.removeItem("userEmail");  
            window.location.href = "login.html"; // Redirect if not logged in
        }
    });

    // ✅ Function to calculate profile completion percentage
    function updateProgress() {
        if (!progressBar) return;

        let filledFields = 0;
        fields.forEach(field => {
            if (field.value.trim() !== "") filledFields++;
        });

        const completion = Math.round((filledFields / fields.length) * 100);
        progressBar.style.width = `${completion}%`;
        progressBar.textContent = `${completion}% Completed`;
    }

    // ✅ Update progress when fields are edited
    fields.forEach(field => {
        field.addEventListener("input", updateProgress);
    });

    // ✅ Save user data to Firestore
    if (saveBtn) {  
        saveBtn.addEventListener("click", async function () {
            const userEmail = localStorage.getItem("userEmail"); 

            if (!userEmail) {
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
                await setDoc(doc(db, "users", userEmail), userData, { merge: true }); // ✅ Save using email
                alert("✅ Profile saved successfully!");
                updateProgress();
            } catch (error) {
                console.error("❌ Error saving data:", error);
            }
        });
    }
});
