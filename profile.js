import { db, auth } from "./firebaseconfig.js";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
    const fields = document.querySelectorAll("input:not(#upload-img), select"); // Excluding file input
    const saveBtn = document.getElementById("save-btn");
    const progressBar = document.getElementById("progress");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const profileImg = document.getElementById("profile-img");
    const defaultImg = "default-profile.png"; // Change this to your actual default image URL
    let profileImageExists = false;

    function updateProgress() {
        let filledFields = 0;
        let totalFields = fields.length + 1; // Include profile image in total fields

        console.log("🔍 Checking fields for completion...");
        fields.forEach(field => {
            console.log(`Field: ${field.id}, Value: "${field.value.trim()}"`);
            if (field.value.trim() !== "") {
                filledFields++;
                field.setAttribute("disabled", true);
            } else {
                field.removeAttribute("disabled");
            }
        });

        console.log("📊 Total fields before image check: ", totalFields);
        console.log("✅ Filled fields before image check: ", filledFields);

        // Ensure profile image is counted
        if (profileImg.src && !profileImg.src.includes(defaultImg)) {
            filledFields++;
            profileImageExists = true;
            console.log("✅ Profile image counted!");
        }

        console.log("✅ Filled fields after image check: ", filledFields);
        console.log("🔍 Profile image exists: ", profileImageExists);
        console.log("📷 Profile image URL: ", profileImg.src);

        const completion = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
        progressBar.style.width = `${completion}%`;
        progressBar.textContent = `${completion}% Completed`;

        console.log("✅ Progress updated: ", completion, "%");
    }

    async function fetchUserData() {
        const userDocId = localStorage.getItem("userDocId");
        if (!userDocId) {
            console.log("⚠️ No userDocId found. Redirecting to login...");
            window.location.href = "login.html";
            return;
        }

        const userRef = doc(db, "users", userDocId);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            console.log("⚠️ No user document found in Firestore.");
            return;
        }

        const userData = docSnap.data();
        console.log("✅ User data retrieved: ", userData);

        nameField.value = userData.name || "";
        emailField.value = userData.email || "";
        nameField.setAttribute("disabled", true);
        emailField.setAttribute("disabled", true);

        fields.forEach(field => {
            if (userData[field.id]) {
                field.value = userData[field.id];
                field.setAttribute("disabled", true);
            }
        });

        if (userData.profileImage) {
            profileImg.src = userData.profileImage;
            console.log("✅ Profile image retrieved and counted: ", userData.profileImage);
        } else {
            console.log("⚠️ No profile image found in Firestore.");
        }

        setTimeout(updateProgress, 500); // Ensure all data is set before calling updateProgress
    }

    fetchUserData();

    document.getElementById("edit-photo-btn").addEventListener("click", function() {
        document.getElementById("upload-img").click();
    });

    document.getElementById("upload-img").addEventListener("change", async function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "profile_uploads");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dgmho4nox/image/upload", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Image upload failed!");

            const data = await response.json();
            const imageUrl = data.secure_url;
            profileImg.src = imageUrl;
            console.log("✅ New profile image uploaded: ", imageUrl);

            const userDocId = localStorage.getItem("userDocId");
            if (userDocId) {
                await setDoc(doc(db, "users", userDocId), { profileImage: imageUrl }, { merge: true });
                console.log("✅ Image URL saved to Firestore!");
            }

            updateProgress();
        } catch (error) {
            console.error("❌ Error uploading image:", error);
        }
    });

    saveBtn.addEventListener("click", async function() {
        const userDocId = localStorage.getItem("userDocId");
        if (!userDocId) {
            alert("⚠️ You need to be logged in to save your profile.");
            return;
        }

        let userData = {};
        fields.forEach(field => {
            if (!field.disabled) {
                const value = field.value.trim();
                if (value) {
                    userData[field.id] = value;
                    field.setAttribute("disabled", true); // Disable field after saving
                }
            }
        });

        if (Object.keys(userData).length === 0) {
            alert("⚠️ No new data to save!");
            return;
        }

        try {
            const userRef = doc(db, "users", userDocId);
            await setDoc(userRef, userData, { merge: true });
            alert("✅ Profile saved successfully!");
            console.log("✅ Data saved to Firestore: ", userData);
            updateProgress();
        } catch (error) {
            console.error("❌ Error updating profile:", error);
        }
    });
});
