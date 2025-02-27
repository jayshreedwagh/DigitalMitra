import { db, auth } from "./firebaseconfig.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async function () {
    console.log("📌 Document loaded.");

    // UI Elements
    const schemeToggle = document.getElementById("schemeToggle");
    const recommendedSchemes = document.getElementById("recommendedSchemes");
    const appliedSchemes = document.getElementById("appliedSchemes");
    const toggleText = document.getElementById("toggleText");
    const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");

    let userData = {};

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
            let isEligible = true;

            // Mandatory Eligibility Check (Skip schemes if failed)
            if (schemeData.Age_Min !== undefined && schemeData.Age_Max !== undefined) {
                totalCriteria++;
                if (userAge >= schemeData.Age_Min && userAge <= schemeData.Age_Max) {
                    matchedCriteria++;
                    console.log(`✔ Age match: ${userAge} in range ${schemeData.Age_Min}-${schemeData.Age_Max}`);
                } else {
                    console.log(`❌ Age mismatch: ${userAge} NOT in range ${schemeData.Age_Min}-${schemeData.Age_Max}`);
                    return; // Skip scheme
                }
            }

            if (schemeData.Annual_Income !== undefined) {
                totalCriteria++;
                if (userIncome >= schemeData.Annual_Income) {
                    matchedCriteria++;
                    console.log(`✔ Income match: ${userIncome} >= ${schemeData.Annual_Income}`);
                } else {
                    console.log(`❌ Income mismatch: ${userIncome} < ${schemeData.Annual_Income}`);
                    return; // Skip scheme
                }
            }

            if (schemeData.Citizen && userData.citizenship) {
                totalCriteria++;
                if (userData.citizenship.toLowerCase() === schemeData.Citizen.toLowerCase()) {
                    matchedCriteria++;
                    console.log(`✔ Citizenship match: User is ${userData.citizenship}`);
                } else {
                    console.log(`❌ Citizenship mismatch. Required: ${schemeData.Citizen}, User: ${userData.citizenship}`);
                    return; // Skip scheme
                }
            }

            // Calculate match percentage
            schemeData.matchPercentage = totalCriteria > 0 ? ((matchedCriteria / totalCriteria) * 100).toFixed(2) : 0;
            schemes.push(schemeData);
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
                <div class="scheme-card" data-category="${scheme.category || 'unknown'}">
                    <h3>${scheme.scheme}</h3>
                    <p>📝 Description: ${scheme.description || "N/A"}</p>
                    <p>🏩 Issued by: ${scheme.issuer || "N/A"}</p>
                    <p>✅ Match Percentage: <strong>${scheme.matchPercentage}%</strong></p>
                    <button data-id="${scheme.id}">More Details</button>
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

    // Toggle Recommended & Applied Schemes
    schemeToggle.addEventListener("change", function () {
        console.log("🔄 Toggle changed. Checked:", schemeToggle.checked);
        recommendedSchemes.style.display = schemeToggle.checked ? "none" : "block";
        appliedSchemes.style.display = schemeToggle.checked ? "block" : "none";
        toggleText.textContent = schemeToggle.checked ? "Applied Schemes" : "Recommended Schemes";
        console.log("📌 Current view:", toggleText.textContent);
    });

    // Search Functionality
    searchBar.addEventListener("input", function () {
        const searchText = searchBar.value.toLowerCase();
        console.log("🔍 Search query:", searchText);
        document.querySelectorAll(".scheme-card").forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(searchText) ? "block" : "none";
        });
    });

    // Category Filtering
    categoryFilter.addEventListener("change", function () {
        const selectedCategory = categoryFilter.value;
        console.log("📌 Selected category:", selectedCategory);
        document.querySelectorAll(".scheme-card").forEach(card => {
            card.style.display = (selectedCategory === "all" || card.dataset.category === selectedCategory) ? "block" : "none";
        });
    });
});
