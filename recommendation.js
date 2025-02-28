import { db, auth } from "./firebaseconfig.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async function () {
    console.log("📌 Document loaded.");

    // UI Elements
    const recommendedSchemes = document.getElementById("recommendedSchemes");
    const appliedSchemes = document.getElementById("appliedSchemes");
    const schemeToggle = document.getElementById("schemeToggle");
    const toggleText = document.getElementById("toggleText");

    let userData = {};

    // Toggle between Recommended & Applied Schemes
    schemeToggle.addEventListener("change", function () {
        if (schemeToggle.checked) {
            recommendedSchemes.classList.add("hidden");
            appliedSchemes.classList.remove("hidden");
            toggleText.textContent = "Applied Schemes";
        } else {
            recommendedSchemes.classList.remove("hidden");
            appliedSchemes.classList.add("hidden");
            toggleText.textContent = "Recommended Schemes";
        }
    });

    // Fetch user data from Firestore using Document ID stored in localStorage
    async function getUserData() {
        console.log("🔄 Fetching user data...");
        const userDocId = localStorage.getItem("userDocId");
        if (!userDocId) return console.warn("⚠️ No user document ID found in localStorage.");
        
        console.log("📌 Using document ID:", userDocId);
        const userDoc = await getDoc(doc(db, "users", userDocId));

        if (userDoc.exists()) {
            userData = userDoc.data();
            console.log("✅ User data fetched:", userData);
        } else {
            console.error("❌ User document not found.");
        }
    }

    // Fetch and filter schemes based on user eligibility
    async function fetchAndDisplaySchemes() {
        console.log("🔄 Fetching schemes...");
        const schemesSnapshot = await getDocs(collection(db, "Schemes"));
        let schemes = [];

        console.log("📌 Total schemes fetched:", schemesSnapshot.size);
        console.log("📌 User data for matching:", userData);

        schemesSnapshot.forEach(doc => {
            const schemeData = { id: doc.id, ...doc.data() };
            console.log("🔍 Processing scheme:", schemeData);

            // Convert numeric values
            let userAge = parseInt(userData.age) || 0;
            let userIncome = parseInt(userData.Income) || 0;
            let matchedCriteria = 0;
            let totalCriteria = 0;
            let isEligible = true; // Track if user is eligible

            // Mandatory Eligibility Check
            if (schemeData.Age_Min !== undefined && schemeData.Age_Max !== undefined) {
                totalCriteria++;
                if (userAge >= schemeData.Age_Min && userAge <= schemeData.Age_Max) {
                    matchedCriteria++;
                    console.log(`✔ Age match: ${userAge} in range ${schemeData.Age_Min}-${schemeData.Age_Max}`);
                } else {
                    console.log(`❌ Age mismatch: ${userAge} NOT in range ${schemeData.Age_Min}-${schemeData.Age_Max}`);
                    isEligible = false; // Mark as ineligible but continue checking
                }
            }
            if (schemeData.Marital_Status !== undefined) {
                totalCriteria++;
                if (schemeData.Marital_Status.toLowerCase() === "na" || userData.Marital.toLowerCase() === schemeData.Marital_Status.toLowerCase()) {
                    matchedCriteria++;
                    console.log(`✔ Marital Status match: User is ${userData.Marital}`);
                } else {
                    console.log(`❌ Marital Status mismatch. Required: ${schemeData.Marital_Status}, User: ${userData.Marital}`);
                    isEligible = false;
                }
            }
            if (schemeData.Annual_Income !== undefined) {
                totalCriteria++;
                if (userIncome >= schemeData.Annual_Income) {
                    matchedCriteria++;
                    console.log(`✔ Income match: ${userIncome} >= ${schemeData.Annual_Income}`);
                } else {
                    console.log(`❌ Income mismatch: ${userIncome} < ${schemeData.Annual_Income}`);
                    isEligible = false;
                }
            }

            // Additional Checks (Will not skip, but affect match percentage)
            if (schemeData.Citizen && userData.citizen) {
                totalCriteria++;
                if (userData.citizen.toLowerCase() === schemeData.Citizen.toLowerCase()) matchedCriteria++;
            }
            if (schemeData.Employement_status && userData.Employment_Status) {
                totalCriteria++;
                if (schemeData.Employement_status.toLowerCase() === "na" || userData.Employment_Status.toLowerCase() === schemeData.Employement_status.toLowerCase()) matchedCriteria++;
            }
            if (schemeData.Occupation && userData.Occupation) {
                totalCriteria++;
                if (schemeData.Occupation.toLowerCase() === "na" || userData.Occupation.toLowerCase() === schemeData.Occupation.toLowerCase()) matchedCriteria++;
            }
            if (schemeData.Gender !== undefined) {
                totalCriteria++;
                if (schemeData.Gender.toLowerCase() === "na" || userData.gender.toLowerCase() === schemeData.Gender.toLowerCase()) matchedCriteria++;
            }

            // Calculate match percentage
            schemeData.matchPercentage = totalCriteria > 0 ? ((matchedCriteria / totalCriteria) * 100).toFixed(2) : 0;

            // Only include schemes with match percentage >= 50%
            if (schemeData.matchPercentage >= 50 && isEligible) {
                schemes.push(schemeData);
            }
        });

        // Sort schemes by match percentage (Descending)
        schemes.sort((a, b) => b.matchPercentage - a.matchPercentage);
        console.log("✅ Sorted schemes:", schemes);

        // Display schemes
        renderSchemes(schemes);
    }

    function renderSchemes(schemes) {
        recommendedSchemes.innerHTML = schemes.length
            ? schemes.map(scheme => `
                <div class="scheme-card">
                    <div class="scheme-header">
                        <h3>${scheme.scheme}</h3>
                        <span class="match-percentage">${scheme.matchPercentage}% Match</span>
                    </div>
                    <p class="scheme-description">${scheme.description || "No description available."}</p>
                    
                    <div class="scheme-footer">
                        <a href="${scheme.link}" target="_blank">
                            <button class="apply-btn">View details</button>
                        </a>
                    </div>
                </div>
            `).join('')
            : `<p class="no-match">⚠️ No matching schemes found.</p>`;
        console.log("✅ Schemes displayed successfully.");
    }

    // Authentication State Listener
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("✅ User authenticated:", user.uid);
            await getUserData();
            await fetchAndDisplaySchemes();
        } else {
            console.warn("⚠️ No authenticated user.");
        }
    });
});
