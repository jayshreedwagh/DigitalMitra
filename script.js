// Import Firebase config
import { db } from "./firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Navigation Functions
window.login = function() {
    window.location.href = "login.html";
};

window.register = function() {
    window.location.href = "registration.html";
};

// Remove the test function call
// Test Firestore Write - this is not needed anymore
