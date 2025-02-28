import { db } from "./firebaseconfig.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { showPopup } from "./popup.js"; // ✅ Import popup

document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
        await addDoc(collection(db, "testing"), {
            name,
            email,
            message,
            timestamp: serverTimestamp()
        });

        showPopup("✅ Feedback submitted successfully!", true);
        document.getElementById("contact-form").reset(); // ✅ Clear form after submission
    } catch (error) {
        console.error("❌ Error submitting feedback:", error);
        showPopup("❌ Failed to submit feedback. Please try again.", false);
    }
});
