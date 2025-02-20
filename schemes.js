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


const schemes = [
    {
        title: "PM Kisan Samman Nidhi",
        description: "Direct income support of ₹6000 per year to farmer families",
        category: "Agriculture",
        link: "https://pmkisan.gov.in/"
    },
    {
        title: "Ayushman Bharat",
        description: "Healthcare scheme providing coverage up to ₹5 lakhs per family per year",
        category: "Healthcare",
        link: "https://pmjay.gov.in/"
    },
    {
        title: "PM Awas Yojana",
        description: "Housing scheme for urban and rural areas to provide affordable housing",
        category: "Housing",
        link: "https://pmaymis.gov.in/"
      },
      {
        title: "Sukanya Samriddhi Yojana",
        description: "Savings scheme for girl child with high interest rate and tax benefits",
        category: "Financial",
        link: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx"
      },
      {
        title: "PM Mudra Yojana",
        description: "Loans up to ₹10 lakhs for small business ventures",
        category: "Business",
        link: "https://www.mudra.org.in/"
      },
      {
        title: "National Pension Scheme",
        description: "Voluntary retirement savings scheme open to all citizens",
        category: "Financial",
        link: "https://www.npscra.nsdl.co.in/"
      },
      {
        title: "PM Ujjwala Yojana",
        description: "Free LPG connections to women from BPL households",
        category: "Welfare",
        link: "https://pmuy.gov.in/"
      },
      {
        title: "Atal Pension Yojana",
        description: "Pension scheme for workers in unorganized sector",
        category: "Financial",
        link: "https://www.apyscheme.in/"
      },
      {
        title: "PM Jan Dhan Yojana",
        description: "Financial inclusion program providing bank accounts with benefits",
        category: "Financial",
        link: "https://www.pmjdy.gov.in/"
      },
      {
        title: "Skill India Mission",
        description: "Skill development and training program for youth",
        category: "Education",
        link: "https://www.skillindia.gov.in/"
      },
      {
        title: "Digital India",
        description: "Initiative to transform India into a digitally empowered society",
        category: "Technology",
        link: "https://www.digitalindia.gov.in/"
      },
      {
        title: "MGNREGA",
        description: "Rural employment guarantee scheme providing 100 days of work",
        category: "Employment",
        link: "https://nrega.nic.in/"
      },
      {
        title: "PM Garib Kalyan Anna Yojana",
        description: "Free food grains distribution to poor families",
        category: "Welfare",
        link: "https://www.pmgkay.in/"
      },
      {
        title: "Beti Bachao Beti Padhao",
        description: "Initiative to save and educate the girl child",
        category: "Education",
        link: "https://wcd.nic.in/bbbp-schemes"
      },
      {
        title: "PM Fasal Bima Yojana",
        description: "Crop insurance scheme for farmers",
        category: "Agriculture",
        link: "https://pmfby.gov.in/"
      },
      {
        title: "Startup India",
        description: "Initiative to promote startup ecosystem in India",
        category: "Business",
        link: "https://www.startupindia.gov.in/"
      },
      {
        title: "Swachh Bharat Mission",
        description: "Clean India campaign for sanitation and waste management",
        category: "Environment",
        link: "https://swachhbharat.mygov.in/"
      },
      {
        title: "National Rural Health Mission",
        description: "Healthcare services improvement in rural areas",
        category: "Healthcare",
        link: "https://nhm.gov.in/"
      },
      {
        title: "PM Kaushal Vikas Yojana",
        description: "Skill development program for Indian youth",
        category: "Education",
        link: "https://pmkvyofficial.org/"
      },
      {
        title: "Make in India",
        description: "Initiative to encourage manufacturing in India",
        category: "Business",
        link: "https://www.makeinindia.com/"
      }
      
    // ... Add all other schemes from the original data ...
];

function renderSchemes(filteredSchemes) {
    const schemesGrid = document.querySelector('.schemes-grid');
    schemesGrid.innerHTML = '';

    filteredSchemes.forEach(scheme => {
        const schemeCard = document.createElement('div');
        schemeCard.className = 'scheme-card';
        schemeCard.innerHTML = `
            <h3 class="scheme-title">${scheme.title}</h3>
            <div class="scheme-category">${scheme.category}</div>
            <p class="scheme-description">${scheme.description}</p>
            <a href="${scheme.link}" target="_blank" rel="noopener noreferrer" class="scheme-link">
                Visit Official Website
            </a>
        `;
        schemesGrid.appendChild(schemeCard);
    });
}

function filterSchemes(searchTerm, isCategoryFilter = false) {
    return schemes.filter(scheme =>
        isCategoryFilter
            ? scheme.category.toLowerCase() === searchTerm.toLowerCase()
            : (
                scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                scheme.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );
}

function initializeCategories() {
    const categories = [...new Set(schemes.map(scheme => scheme.category))];
    const categoryButtons = document.querySelector('.category-buttons');

    categoryButtons.innerHTML = ''; // Clear existing buttons

    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category;

        button.addEventListener('click', () => {
            searchInput.value = ''; // Clear search input when filtering by category
            renderSchemes(filterSchemes(category, true)); // Filter by category
        });

        categoryButtons.appendChild(button);
    });
}

// Initialize the page
let searchInput;
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        renderSchemes(filterSchemes(searchTerm));
    });

    initializeCategories();
    renderSchemes(schemes); // Initial render with all schemes
});
