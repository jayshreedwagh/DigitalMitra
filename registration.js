import { db } from "./firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();  // Prevent the default form submission

    const name1= document.getElementById("name").value;
    const email1 = document.getElementById("email").value;
    const password1 = document.getElementById("password").value;

    async function addTestData() {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: name1,
                email: email1,
                password:password1,
                timestamp: new Date()
            });
            console.log("✅ Document written with ID:", docRef.id);
        } catch (error) {
            console.error("❌ Error adding document:", error);
        }
    }
    
    addTestData();
});
