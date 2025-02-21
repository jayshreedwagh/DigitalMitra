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
      t1:"Eligibility :",
      eligibility:[

        "1)Small and marginal farmers owning cultivable land.",
        "2)Must be an Indian citizen.",
        "3)Institutional landholders, taxpayers, and professionals (doctors, engineers, etc.) are not eligible."
      ],
      t2:"Benefits :",
      benefits:[

       "1)Direct transfer of ₹6000 annually to the bank account of farmers.",
       "2)Financial assistance to support agricultural needs.",
       "3)Helps in reducing financial stress on small and marginal farmers."
      ],    
      category: "Agriculture",
      link: "https://pmkisan.gov.in/"
      
  },
  {
    title: "Ayushman Bharat",
    
    category: "Healthcare",
    t1:"Eligibility :",
      eligibility:[
        "1)Families identified in the Socio-Economic Caste Census (SECC) database.",
          "2)Beneficiaries of Rashtriya Swasthya Bima Yojana (RSBY).",
         "3)No age or family size restriction."
      ],
    t2:"Benefits :",
    benefits:[
      "1)₹5 lakh per family per year for hospitalization expenses.",
      "2)Covers over 1,500 medical procedures.",
      "3)Cashless treatment at empaneled hospitals."
    ],
    link: "https://pmjay.gov.in/"
},
{
    title: "PM Awas Yojana",
    
    category: "Housing",
    t1:"Eligibility :",
    eligibility: [
      "Low-income groups (LIG), economically weaker sections (EWS), and middle-income groups (MIG).",
      "No prior ownership of a pucca house.",
      "Female ownership mandatory for EWS/LIG categories."
    ],
    t2:"Benefits :",
    benefits: [
      "Interest subsidy on home loans ranging from 3% to 6.5%.",
      "Financial assistance up to ₹2.67 lakh for home construction.",
      "Focus on slum rehabilitation and affordable housing."
    ],
    link: "https://pmaymis.gov.in/"
  },
  {
    title: "Sukanya Samriddhi Yojana",
    
    category: "Financial",
    t1:"Eligibility :",
    eligibility: [
      "Parents of a girl child below 10 years of age.",
      "Only two accounts allowed per family, except in the case of twins."
    ],
    t2:"Benefits :",
    benefits: [
      "High interest rates (compounded annually).",
      "Tax exemption under Section 80C.",
      "Partial withdrawal allowed for education and marriage."
    ],
    link: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx"
  },
  {
    title: "PM Mudra Yojana",
    
    category: "Business",
    t1:"Eligibility :",
    eligibility: [
      "Small business owners, entrepreneurs, and self-employed individuals.",
      "No collateral required for loans."
    ],
    t2:"Benefits :",
    benefits: [
      "Easy loan processing with minimal paperwork.",
      "No requirement for collateral.",
      "Encourages self-employment and small businesses."
    ],
    link: "https://www.mudra.org.in/"
  },
  {
    title: "National Pension Scheme",
    
    category: "Financial",
    t1:"Eligibility :",
    eligibility: [
      "Any Indian citizen between 18-65 years of age.",
      "NRI’s are also eligible."
    ],
    t2:"Benefits :",
    benefits: [
      "Tax benefits under Section 80C and 80CCD(1B).",
      "Option to choose different investment schemes.",
      "Regular pension after retirement."
    ],
    link: "https://www.npscra.nsdl.co.in/"
  },
  {
    title: "PM Ujjwala Yojana",
    
    category: "Welfare",
    t1:"Eligibility :",
    eligibility: [
      "Women from Below Poverty Line (BPL) families.",
      "Must not already have an LPG connection."
    ],
    t2:"Benefits :",
    benefits: [
      "Free LPG connection and first refill subsidy.",
      "Reduces indoor air pollution.",
      "Promotes clean cooking practices."
    ],
    link: "https://pmuy.gov.in/"
  },
  {
    title: "Atal Pension Yojana",
    
    category: "Financial",
    t1:"Eligibility :",
    eligibility: [
      "Indian citizens aged 18-40 years.",
      "Must contribute till the age of 60."
    ],
    t2:"Benefits :",
    benefits: [
      "Guaranteed pension after retirement.",
      "Government co-contribution for eligible subscribers.",
      "Death benefits to spouse or nominee."
    ],
    link: "https://www.apyscheme.in/"
  },
  {
    title: "PM Jan Dhan Yojana",
    
    category: "Financial",
    t1:"Eligibility :",
    eligibility: [
      "Any Indian citizen can open an account."
    ],
    t2:"Benefits :",
    benefits: [
      "No minimum balance required.",
      "Accidental insurance cover up to ₹2 lakh.",
      "Overdraft facility up to ₹10,000."
    ],
    link: "https://www.pmjdy.gov.in/"
  },
  {
    title: "Skill India Mission",
    
    category: "Education",
    t1:"Eligibility :",
    eligibility: [
      "Indian citizens, primarily youth seeking employment skills.",
      "No age restrictions; open to students, school dropouts, and job seekers."
    ],
    t2:"Benefits :",
    benefits: [
      "Provides skill training in various industries.",
      "Certifications recognized by employers.",
      "Enhances job opportunities and self-employment potential."
    ],
    link: "https://www.skillindia.gov.in/"
  },
  {
    title: "Digital India",
   
    category: "Technology",
    t1:"Eligibility :",
    eligibility: [
      "Open to all Indian citizens and businesses.",
      "Focus on improving digital literacy and accessibility."
    ],
    t2:"Benefits :",
    benefits: [
      "Promotes internet connectivity and digital services.",
      "Encourages e-governance and digital transactions.",
      "Enhances technology infrastructure in rural areas."
    ],
    link: "https://www.digitalindia.gov.in/"
  },
  {
    title: "MGNREGA",
    
    category: "Employment",
    t1:"Eligibility :",
    eligibility: [
      "Rural households willing to do unskilled manual work.",
      "Indian citizen above 18 years of age."
    ],
    t2:"Benefits :",
    benefits: [
      "Guaranteed 100 days of wage employment per year.",
      "Improves rural livelihoods and infrastructure.",
      "Empowers women and marginalized communities."
    ],
    link: "https://nrega.nic.in/"
  },
  {
    title: "PM Garib Kalyan Anna Yojana",
    
    category: "Welfare",
    t1:"Eligibility :",
    eligibility: [
      "Families under the National Food Security Act (NFSA).",
      "Priority Household (PHH) and Antyodaya Anna Yojana (AAY) beneficiaries."
    ],
    t2:"Benefits :",
    benefits: [
      "Free distribution of 5 kg rice/wheat per person per month.",
      "Ensures food security for economically weaker sections.",
      "Supports vulnerable populations during crises."
    ],
    link: "https://www.pmgkay.in/"
  },
  {
    title: "Beti Bachao Beti Padhao",
    
    category: "Education",
    t1:"Eligibility :",
    eligibility: [
      "Applicable to all Indian families.",
      "Focus on districts with low child sex ratio."
    ],
    t2:"Benefits :",
    benefits: [
      "Promotes girl child education and welfare.",
      "Financial incentives for girl child development.",
      "Awareness campaigns against gender discrimination."
    ],
    link: "https://wcd.nic.in/bbbp-schemes"
  },
  {
    title: "PM Fasal Bima Yojana",
    
    category: "Agriculture",
    t1:"Eligibility :",
    eligibility: [
      "All farmers (including tenant farmers) growing notified crops.",
      "Enrollment through banks or insurance companies."
    ],
    t2:"Benefits :",
    benefits: [
      "Covers losses due to natural calamities, pests, and diseases.",
      "Low premium rates (2% for kharif, 1.5% for rabi crops).",
      "Timely claim settlement and financial support."
    ],
    link: "https://pmfby.gov.in/"
  },
  {
    title: "Startup India",
    
    category: "Business",
    t1:"Eligibility :",
    eligibility: [
      "Startups registered in India with innovative products/services.",
      "Turnover not exceeding ₹100 crore in any financial year.",
      "Entity should not be older than 10 years."
    ],
    t2:"Benefits :",
    benefits: [
      "Tax exemptions for startups.",
      "Funding support via government schemes.",
      "Simplified compliance and self-certification."
    ],
    link: "https://www.startupindia.gov.in/"
  },
  {
    title: "Swachh Bharat Mission",
    
    category: "Environment",
    t1:"Eligibility :",
    eligibility: [
      "All Indian citizens and institutions.",
      "Focused on rural and urban sanitation projects."
    ],
    t2:"Benefits :",
    benefits: [
      "Encourages toilet construction and sanitation awareness.",
      "Improves waste management infrastructure.",
      "Reduces open defecation and promotes hygiene."
    ],
    link: "https://swachhbharat.mygov.in/"
  },
  {
    title: "National Rural Health Mission",
    category: "Healthcare",
    t1:"Eligibility :",
    eligibility: [
      "Rural populations, especially women and children.",
      "Priority given to economically weaker sections."
    ],
    t2:"Benefits :",
    benefits: [
      "Provides free or subsidized healthcare in rural areas.",
      "Improves maternal and child health services.",
      "Expands availability of essential medicines and facilities."
    ],
    link: "https://nhm.gov.in/"
  },
  {
    title: "PM Kaushal Vikas Yojana",
    category: "Education",
    t1:"Eligibility :",
    eligibility: [
      "Indian citizens aged 15-45 years.",
      "School/college dropouts and unemployed youth."
    ],
    t2:"Benefits :",
    benefits: [
      "Free vocational training in various sectors.",
      "Certification and job placement assistance.",
      "Boosts self-employment and entrepreneurship."
    ],
    link: "https://pmkvyofficial.org/"
  },
  {
    title: "Make in India",
    category: "Business",
    t1:"Eligibility :",
    eligibility: [
      "Open to Indian and foreign companies setting up manufacturing units in India.",
      "Covers 25 sectors including electronics, defense, and automobiles."
    ],
    t2:"Benefits :",
    benefits: [
      "Incentives for businesses investing in India.",
      "Simplified business regulations and ease of doing business.",
      "Job creation and industrial growth."
    ],
    link: "https://www.makeinindia.com/"
  },
  {
    title: "Pradhan Mantri Shram Yogi Maan-Dhan Yojana (PM-SYM)",
    subtitle: "(Old Age Protection)",
   
    category: "Financial",
    t1:"Eligibility :",
    eligibility: [
      " 1)Should be an Indian Citizen.",
      " 2) Unorganised Workers (working as street vendors, agriculture related work, construction site workers, workers in industries of leather, handloom, mid-day meal, rickshaw or auto wheelers, rag picking, carpenters, fisherman's etc.",
      "Age group of 18-40 years.", 
      " 3)Monthly income is below Rs.15000 and not a member of EPFO/ESIC/NPS (Govt. funded)."
    ],
    t2:"Benefits :",
    benefits: [
      " 1)After attaining the age of 60 yrs, beneficiaries are entitled to receive monthly assured pension of Rs.3000/-      ",
      " 2)On death of the beneficiary, spouse is eligible for 50% monthly pension.",
      " 3)If husband and wife, both joins the scheme, they are eligible for Rs. 6000/- monthly pension jointly."
    ],
    link: "https://example.gov.in/pmsym"
  },
  // ... other schemes ...
];
function renderSchemes(filteredSchemes) {
  const schemesGrid = document.querySelector('.schemes-grid');
  schemesGrid.innerHTML = '';

  filteredSchemes.forEach(scheme => {
      const schemeCard = document.createElement('div');
      schemeCard.className = 'scheme-card';

      // Format description if it's an array
     

      // Create bullet points for eligibility and benefits
      const createBulletList = (items) => {
          if (Array.isArray(items)) {
              return items.map(item => `<li>${item}</li>`).join('');
          }
          return `<li>${items}</li>`;
      };

      schemeCard.innerHTML = `
          <h3 class="scheme-title">${scheme.title}</h3>
          ${scheme.subtitle ? `<h4 class="scheme-subtitle">${scheme.subtitle}</h4>` : ''}
          <div class="scheme-category">${scheme.category}</div>
       
          <div class="scheme-details">
              <h4 class="scheme-t1">${scheme.t1}</h4>
              <ul class="scheme-eligibility">
                  ${createBulletList(scheme.eligibility)}
              </ul>
              <h4 class="scheme-t2">${scheme.t2}</h4>
              <ul class="scheme-benefits">
                  ${createBulletList(scheme.benefits)}
              </ul>
          </div>
          <a href="${scheme.link}" target="_blank" rel="noopener noreferrer" class="scheme-link">
              Visit Official Website
          </a>
      `;
      schemesGrid.appendChild(schemeCard);
  });
}

// Filter schemes based on search term or category
function filterSchemes(searchTerm, isCategoryFilter = false) {
  if (!searchTerm) return schemes;

  return schemes.filter(scheme => {
      const searchFields = [
          scheme.title,
          scheme.category,
          Array.isArray(scheme.eligibility) ? scheme.eligibility.join(' ') : scheme.eligibility,
          Array.isArray(scheme.benefits) ? scheme.benefits.join(' ') : scheme.benefits
      ];

      const searchString = searchFields.join(' ').toLowerCase();
      
      return isCategoryFilter
          ? scheme.category.toLowerCase() === searchTerm.toLowerCase()
          : searchString.includes(searchTerm.toLowerCase());
  });
}

// Initialize category buttons
function initializeCategories() {
  const categories = [...new Set(schemes.map(scheme => scheme.category))];
  const categoryButtons = document.querySelector('.category-buttons');
  
  // Add "All" button
  const allButton = document.createElement('button');
  allButton.className = 'category-btn active';
  allButton.textContent = 'All';
  allButton.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      allButton.classList.add('active');
      renderSchemes(schemes);
  });
  categoryButtons.appendChild(allButton);

  // Add category buttons
  categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'category-btn';
      button.textContent = category;

      button.addEventListener('click', () => {
          document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          renderSchemes(filterSchemes(category, true));
      });

      categoryButtons.appendChild(button);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');

  searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value;
      renderSchemes(filterSchemes(searchTerm));
      
      // Reset active state of category buttons when searching
      document.querySelectorAll('.category-btn').forEach(btn => {
          btn.classList[btn.textContent === 'All' ? 'add' : 'remove']('active');
      });
  });

  initializeCategories();
  renderSchemes(schemes); // Initial render with all schemes
});