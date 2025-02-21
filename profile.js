import { db, collection, addDoc, auth } from "firebaseConfig.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
    const fields = document.querySelectorAll("input, select");
    const saveBtn = document.getElementById("save-btn");
    const progressBar = document.getElementById("progress");
    
    // 🔥 Detect logged-in user
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userId = user.uid;
            console.log("✅ Logged in as:", user.email);

            // Fetch user profile data
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                fields.forEach(field => {
                    if (userData[field.id]) {
                        field.value = userData[field.id];
                        field.disabled = true; // Lock pre-filled fields
                    }
                });
                updateProgress();
            }
        } else {
            console.log("⚠️ No user logged in.");
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
        const user = auth.currentUser;
        if (!user) {
            alert("You need to be logged in to save your profile.");
            return;
        }

        const userId = user.uid;
        let userData = {};

        fields.forEach(field => {
            if (field.value.trim() !== "") {
                userData[field.id] = field.value;
                field.disabled = true; // Lock after saving
            }
        });

        try {
            await setDoc(doc(db, "users", userId), userData);
            alert("Profile saved successfully!");
            updateProgress();
        } catch (error) {
            console.error("Error saving data: ", error);
        }
    });
});
