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

    function updateProgress() {
        if (!progressBar) return;
        let filledFields = 0;
        let totalFields = 0;
    
        fields.forEach(field => {
            if (field.id !== "name" && field.id !== "email") { 
                totalFields++;
                if (field.value.trim() !== "") filledFields++;
            }
        });
    
        const completion = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
        progressBar.style.width = `${completion}%`;
        progressBar.textContent = `${completion}% Completed`;
    }
    

    // ✅ Fetch user data and lock already saved fields
 // ✅ Fetch user data and lock already saved fields
async function fetchUserData(userEmail) {
    const userRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(userRef);

    let userData = {};

    if (docSnap.exists()) {
        userData = docSnap.data();
        console.log("✅ User data found (by ID):", userData);
    } else {
        console.log("⚠️ No user document found by ID, searching by email...");
        
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0]; 
            userData = docSnap.data();
            console.log("✅ User data found (by email query):", userData);
        } else {
            console.log("⚠️ No profile data found for email:", userEmail);
            return;
        }
    }

    // ✅ Fill in the fields with saved data
    nameField.value = userData.name || "N/A";
    emailField.value = userData.email || userEmail;
    displayName.textContent = userData.name || "User";
    displayEmail.textContent = userData.email || userEmail;

    nameField.setAttribute("disabled", true);
    emailField.setAttribute("disabled", true);

    fields.forEach(field => {
        if (userData[field.id]) {
            field.value = userData[field.id];
            field.setAttribute("disabled", true); // ✅ Lock fields that are already saved
        }
    });

    updateProgress();
}


    // ✅ Check for logged-in user
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userEmail = user.email;
            localStorage.setItem("userEmail", userEmail);
            console.log("✅ Logged in as:", userEmail);
            await fetchUserData(userEmail);
        } else {
            console.log("⚠️ No user logged in.");
            localStorage.removeItem("userEmail");  
            window.location.href = "login.html"; // Redirect if not logged in
        }
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
                if (field.id !== "name" && field.id !== "email") {
                    userData[field.id] = field.value.trim();
                }
            });
        
            try {
                const userRef = doc(db, "users", userEmail);
        
                // ✅ First, fetch the existing data
                const docSnap = await getDoc(userRef);
                let existingData = docSnap.exists() ? docSnap.data() : {};
        
                // ✅ Merge new data with existing data
                await setDoc(userRef, { ...existingData, ...userData }, { merge: true });
        
                alert("✅ Profile saved successfully!");
                
                // ✅ Lock fields after saving
                fields.forEach(field => {
                    if (userData[field.id]) {
                        field.setAttribute("disabled", true);
                    }
                });
        
                updateProgress(); // ✅ Update progress only after clicking Save
            } catch (error) {
                console.error("❌ Error saving data:", error);
            }
        });
        
    }
});
