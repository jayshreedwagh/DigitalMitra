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
 async function fetchUserData() {
    const userDocId = localStorage.getItem("userDocId"); 

    if (!userDocId) {
        console.error("❌ No userDocId found. Redirecting to login...");
        window.location.href = "login.html";
        return;
    }

    const userRef = doc(db, "users", userDocId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        console.error("⚠️ No user document found for ID:", userDocId);
        return;
    }

    const userData = docSnap.data();
    console.log("✅ User data loaded:", userData);

    // Ensure elements exist before modifying
    if (nameField) nameField.value = userData.name || "";
    if (emailField) emailField.value = userData.email || "";
    nameField.setAttribute("disabled", true);
    emailField.setAttribute("disabled", true);

    // disabling the fields
    fields.forEach(field => {
        if (field.id !== "name" && field.id !== "email") {
            if (userData[field.id] && userData[field.id].trim() !== "") {
                field.value = userData[field.id];
                field.setAttribute("disabled", true); // Only disable filled fields
            } else {
                field.removeAttribute("disabled"); // Keep empty fields editable
            }
        }
    });
    

    updateProgress();
}




    // ✅ Check for logged-in user
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userEmail = user.email;
            console.log("✅ Logged in as:", userEmail);
    
            // 🛠️ Fetch document ID using the email
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Get the first matching document
                const userDocId = userDoc.id;
                localStorage.setItem("userDocId", userDocId);
                console.log("✅ Stored userDocId:", userDocId);
    
                await fetchUserData(); // Call fetchUserData AFTER storing userDocId
            } else {
                console.error("⚠️ User document not found!");
            }
        } else {
            console.log("⚠️ No user logged in.");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userDocId");
            window.location.href = "login.html"; // Redirect if not logged in
        }
    });
    

    // ✅ Save user data to Firestore
    if (saveBtn) {  
        saveBtn.addEventListener("click", async function () {
            const userDocId = localStorage.getItem("userDocId"); 
        
            if (!userDocId) {
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
                const userRef = doc(db, "users", userDocId);
        
                // ✅ First, fetch the existing data
                const docSnap = await getDoc(userRef);
                let existingData = docSnap.exists() ? docSnap.data() : {};
        
                // ✅ Merge new data with existing data
                await setDoc(userRef, { ...existingData, ...userData }, { merge: true });
        
                alert("✅ Profile saved successfully!");
                
                // ✅ Lock fields after saving
                fields.forEach(field => {
                    if (userData[field.id] && field.value.trim() !== "") {
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
