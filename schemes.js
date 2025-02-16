import { showPopup } from "./popup.js";

const schemesList = document.getElementById("schemes-list");

// ✅ Replace with an actual government API URL
const API_URL = "https://api.example.com/gov-schemes";  

async function fetchSchemes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.schemes && data.schemes.length > 0) {
            schemesList.innerHTML = "";  // Clear loading message

            data.schemes.forEach((scheme) => {
                const schemeCard = document.createElement("div");
                schemeCard.classList.add("scheme-card");

                schemeCard.innerHTML = `
                    <h3>${scheme.name}</h3>
                    <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
                    <p><strong>Benefits:</strong> ${scheme.benefits}</p>
                    <button class="apply-btn" data-id="${scheme.id}">Apply</button>
                `;

                schemesList.appendChild(schemeCard);
            });

            // Attach event listeners to "Apply" buttons
            document.querySelectorAll(".apply-btn").forEach(button => {
                button.addEventListener("click", applyForScheme);
            });

        } else {
            schemesList.innerHTML = "<p>No schemes available at the moment.</p>";
        }

    } catch (error) {
        console.error("Error fetching schemes:", error);
        showPopup("⚠️ Failed to load schemes. Please try again later.", false);
    }
}

// Call function on page load
fetchSchemes();
