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
    link: "https://www.nsiindia.gov.in/(S(dkeb05r4i2fiof55eudn4nyo))/InternalPage.aspx?Id_Pk=89"
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
    link: "https://www.npscra.nsdl.co.in/scheme-details.php"
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
    link: "https://skillindiamission.in/"
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
    link: "https://www.myscheme.gov.in/schemes/pm-gkay"
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
    link: "https://www.myscheme.gov.in/schemes/bbbp"
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
    link: "https://swachhbharatmission.ddws.gov.in/"
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
    link: "https://en.wikipedia.org/wiki/Pradhan_Mantri_Kaushal_Vikas_Yojana"
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
    link: "https://maandhan.in/"
  },

 {
      "title": "PM-Kisan Credit Card",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Small and marginal farmers.",
        "2) Tenant farmers, oral lessees, and sharecroppers.",
        "3) Self-help groups or joint liability groups of farmers."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Credit support for cultivation expenses.",
        "2) Credit for farm machinery and other agricultural investments.",
        "3) Collateral-free loans up to a specified limit."
      ],
      "category": "Agriculture",
      "link": "https://pmkisan.gov.in"
  },
  {
      "title": "National Rural Livelihood Mission",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Rural women from poor households.",
        "2) Priority to SC/ST, minorities, and disabled.",
        "3) Self-help groups in rural areas."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Financial assistance to start micro-enterprises.",
        "2) Interest subvention on loans.",
        "3) Skill development and training programs."
      ],
      "category": "Rural Development",
      "link": "https://aajeevika.gov.in"
  },
  {
      "title": "Pradhan Mantri Fasal Bima Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Farmers growing notified crops in notified areas.",
        "2) Both loanee and non-loanee farmers can enroll.",
        "3) Farmers of all land holdings."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Comprehensive risk coverage for pre-sowing to post-harvest losses.",
        "2) Low premium rates - 2% for Kharif, 1.5% for Rabi crops.",
        "3) Full insurance coverage without capping of sum insured."
      ],
      "category": "Agriculture",
      "link": "https://pmfby.gov.in"
  },
  {
      "title": "Vidya Lakshmi Portal",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Indian students seeking education loans for higher studies.",
        "2) Students who have secured admission in educational institutions in India or abroad.",
        "3) Students meeting the specific eligibility criteria of participating banks."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Single window for education loan applications to multiple banks.",
        "2) Comprehensive information about education loan schemes.",
        "3) Access to scholarship information."
      ],
      "category": "Education",
      "link": "https://www.vidyalakshmi.co.in"
  },
  {
      "title": "Rashtriya Swasthya Bima Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Below Poverty Line (BPL) families.",
        "2) Unorganized sector workers.",
        "3) MGNREGA workers who have worked for more than 15 days."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Health insurance coverage up to ₹30,000 per family per year.",
        "2) Cashless hospitalization at empaneled hospitals.",
        "3) Transportation allowance."
      ],
      "category": "Healthcare",
      "link": "https://www.india.gov.in/spotlight/rashtriya-swasthya-bima-yojana"
  },
  {
      "title": "Solar Subsidies Scheme",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Residential homeowners.",
        "2) Rural and urban beneficiaries.",
        "3) Commercial and industrial establishments in specific categories."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Subsidy of up to 40% for rooftop solar installations.",
        "2) Additional incentives from state governments.",
        "3) Reduced electricity bills and carbon footprint."
      ],
      "category": "Energy",
      "link": "https://mnre.gov.in"
  },
  {
      "title": "Pradhan Mantri Suraksha Bima Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Indian citizens aged 18-70 years.",
        "2) Must have a bank account linked to Aadhaar.",
        "3) Can be enrolled through auto-debit facility."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Accidental death and disability cover of ₹2 lakh.",
        "2) Annual premium of only ₹12.",
        "3) Simple enrollment process through banks."
      ],
      "category": "Insurance",
      "link": "https://financialservices.gov.in/beta/en/pmsby"
  },
  {
      "title": "Pradhan Mantri Vaya Vandana Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Indian citizens aged 60 years and above.",
        "2) No maximum age limit for entry.",
        "3) Must be able to invest the minimum required amount."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Assured pension of 8% per annum.",
        "2) Pension paid monthly, quarterly, half-yearly or yearly.",
        "3) Loan facility available during the policy term."
      ],
      "category": "Social Security",
      "link": "https://web.umang.gov.in/landing/department/pmvvy.html"
  },
  {
      "title": "Rashtriya Krishi Vikas Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) State governments implementing agricultural projects.",
        "2) Farmers groups and cooperatives through state plans.",
        "3) Rural communities involved in agriculture."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Financial assistance for agriculture infrastructure development.",
        "2) Support for quality seed production and distribution.",
        "3) Funding for innovative agricultural projects."
      ],
      "category": "Agriculture",
      "link": "https://rkvy.nic.in"
  },
  {
      "title": "Pradhan Mantri Matru Vandana Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Pregnant and lactating women for first live birth.",
        "2) Must be at least 19 years of age.",
        "3) Registered at the Anganwadi center."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Cash benefit of ₹5,000 in three installments.",
        "2) Compensation for wage loss during pregnancy.",
        "3) Improved access to healthcare and nutrition."
      ],
      "category": "Healthcare",
      "link": "https://wcd.delhi.gov.in/wcd/pradhan-mantri-matru-vandana-yojana-pmmvy"
  },
  {
      "title": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Rural youth aged 15-35 years.",
        "2) Priority to SC/ST, women, and minorities.",
        "3) Minimum qualification varies by training program."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Free skill development training.",
        "2) Placement assistance for trained youth.",
        "3) Post-placement support and tracking."
      ],
      "category": "Skill Development",
      "link": "https://en.wikipedia.org/wiki/Deen_Dayal_Upadhyaya_Grameen_Kaushalya_Yojana"
  },
  {
      "title": "Pradhan Mantri Kaushal Vikas Yojana",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Indian citizens aged 15-45 years.",
        "2) School/college dropouts and unemployed youth.",
        "3) Workers seeking certification for skills."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Free short-term skill training.",
        "2) Industry-relevant curriculum.",
        "3) Monetary reward on successful completion and certification."
      ],
      "category": "Skill Development",
      "link": "https://en.wikipedia.org/wiki/Pradhan_Mantri_Kaushal_Vikas_Yojana"
  },
  {
      "title": "Anganwadi Services Scheme",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Children below 6 years of age.",
        "2) Pregnant women and lactating mothers.",
        "3) Adolescent girls in specified areas."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Supplementary nutrition for children and mothers.",
        "2) Immunization and health check-ups.",
        "3) Pre-school education for children aged 3-6 years."
      ],
      "category": "Child Development",
      "link": "https://www.shankariasparliament.com/current-affairs/anganwadi-services"
  },
  {
      "title": "Beti Bachao Beti Padhao",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Girl children and their families.",
        "2) Communities with declining child sex ratio.",
        "3) Educational institutions promoting girl child education."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Initiatives to prevent gender-biased sex selection.",
        "2) Support for girls' education.",
        "3) Awareness campaigns on gender equality."
      ],
      "category": "Gender Equality",
      "link": "https://www.myscheme.gov.in/schemes/bbbp"
  },
  {
      "title": "National Food Security Mission",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Farmers in the selected districts.",
        "2) Special focus on small and marginal farmers.",
        "3) Districts with low productivity but high potential."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Distribution of high-yielding variety seeds.",
        "2) Demonstration of improved production technology.",
        "3) Supply of agricultural inputs at subsidized rates."
      ],
      "category": "Agriculture",
      "link": "https://nfsm.gov.in"
  },
  {
      "title": "Credit Linked Capital Subsidy Scheme",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Micro and small enterprises.",
        "2) Existing or new enterprises undertaking technology upgradation.",
        "3) Enterprises in manufacturing sectors as per specified list."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) 15% capital subsidy on eligible investments.",
        "2) Maximum subsidy limit of ₹15 lakhs.",
        "3) Technology upgradation support."
      ],
      "category": "Industry",
      "link": "https://msme.gov.in/schemes/technology-upgradation-and-quality-certification/credit-linked-capital-subsidy-technology"
  },
  {
      "title": "Mid-Day Meal Scheme",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Students in government and government-aided schools.",
        "2) Primary and upper primary classes (Class I to VIII).",
        "3) Schools must have kitchen facilities."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Free hot cooked meal on school days.",
        "2) Nutritional support to enhance enrollment and attendance.",
        "3) Improved nutrition levels among children."
      ],
      "category": "Education",
      "link": "https://en.wikipedia.org/wiki/Midday_Meal_Scheme"
  },
  {
      "title": "Integrated Child Development Services",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Children under 6 years of age.",
        "2) Pregnant and lactating mothers.",
        "3) Women aged 15-44 years."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Supplementary nutrition.",
        "2) Immunization and health check-ups.",
        "3) Referral services and pre-school education."
      ],
      "category": "Child Development",
      "link": "https://wcd.delhi.gov.in/wcd/introduction-integrated-child-development-services#:~:text=Integrated%20Child%20Development%20Services%20(ICDS,impressive%20progress%20in%20many%20spheres."
  },
  {
      "title": "National Rural Health Mission",
      "t1": "Eligibility :",
      "eligibility": [
        "1) Rural population across India.",
        "2) Special focus on 18 states with weak health infrastructure.",
        "3) Vulnerable sections of society."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Improved healthcare access in rural areas.",
        "2) Strengthened public health systems.",
        "3) Community participation in healthcare planning."
      ],
      "category": "Healthcare",
      "link": "https://nihfw.ac.in/cms/national-rural-health-mission.php"
  },
  {
      "title": "Digital India Land Records Modernization Programme",
      "t1": "Eligibility :",
      "eligibility": [
        "1) All landowners.",
        "2) State governments implementing the program.",
        "3) Gram panchayats and local bodies."
      ],
      "t2": "Benefits :",
      "benefits": [
        "1) Computerization of land records.",
        "2) Modernization of land registration process.",
        "3) Updated maps using modern survey techniques."
      ],
      "category": "Land Governance",
      "link": "https://dolr.gov.in/dilrmp"
  }
  ]
 
  // ... other schemes ...

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