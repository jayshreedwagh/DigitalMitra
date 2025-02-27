// DigitalMitra Chatbot Implementation

// Configuration object for the chatbot
const digitalMitraConfig = {
  botName: "DigitalMitra",
  languages: ["english", "marathi"],
  defaultLanguage: "english",
  
  // Knowledge base for website FAQ answers
  knowledgeBase: {
    english: {
      "how to use this website": "You can navigate through our website using the menu at the top. Browse our products/services by clicking on respective categories.",
      "contact information": "You can reach us at support@digitalmitra.com or call us at +91-9067460129 during business hours.",
      "business hours": "We are available Monday to Friday, 9 AM to 6 PM IST.",
      "about us": "We are a digital solutions provider committed to helping businesses grow online.",
      "services": "We offer web development, app development, digital marketing, and e-commerce solutions."
      // Add more Q&A pairs as needed
    },
    marathi: {
      "या वेबसाइटचा वापर कसा करावा": "आपण वरील मेनू वापरून आमच्या वेबसाइटवर नेव्हिगेट करू शकता. संबंधित श्रेणींवर क्लिक करून आमचे उत्पादने/सेवा ब्राउझ करा.",
      "संपर्क माहिती": "आपण आम्हाला contact@yourwebsite.com वर किंवा व्यवसायाच्या वेळेत +91-XXXXXXXXXX वर कॉल करून संपर्क साधू शकता.",
      "व्यावसायिक तास": "आम्ही सोमवार ते शुक्रवार, सकाळी 9 ते संध्याकाळी 6 IST पर्यंत उपलब्ध आहोत.",
      "आमच्याबद्दल": "आम्ही डिजिटल सोल्युशन्स प्रदाता आहोत जे व्यवसायांना ऑनलाइन वाढवण्यास मदत करण्यास वचनबद्ध आहेत.",
      "सेवा": "आम्ही वेब डेव्हलपमेंट, अॅप डेव्हलपमेंट, डिजिटल मार्केटिंग आणि ई-कॉमर्स सोल्युशन्स ऑफर करतो."
      // Add more Q&A pairs as needed
    }
  },
  
  // Function to handle user queries
  handleQuery: function(query, language) {
    // Default to English if language not specified
    const currentLanguage = this.languages.includes(language) ? language : this.defaultLanguage;
    
    // Convert query to lowercase for case-insensitive matching
    const normalizedQuery = query.toLowerCase();
    
    // Check if we have an exact match in our knowledge base
    if (this.knowledgeBase[currentLanguage][normalizedQuery]) {
      return this.knowledgeBase[currentLanguage][normalizedQuery];
    }
    
    // If no exact match, check for partial matches
    for (const key in this.knowledgeBase[currentLanguage]) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        return this.knowledgeBase[currentLanguage][key];
      }
    }
    
    // If no matches found, return default message
    return currentLanguage === "english" 
      ? "I'm sorry, I don't have information about that. Please try asking in a different way or contact our support team."
      : "माफ करा, मला याबद्दल माहिती नाही. कृपया वेगळ्या प्रकारे विचारण्याचा प्रयत्न करा किंवा आमच्या सपोर्ट टीमशी संपर्क साधा.";
  }
};

// Function to add the chatbot UI to your website
function initializeDigitalMitra() {
  // Create chatbot toggle button
  const chatToggle = document.createElement('div');
  chatToggle.className = 'chat-toggle';
  chatToggle.innerHTML = '💬';
  document.body.appendChild(chatToggle);
  
  // Create chatbot container
  const chatbotContainer = document.createElement('div');
  chatbotContainer.className = 'digitalmitra-container hidden';
  chatbotContainer.innerHTML = `
    <div class="chat-header">
      <h3>DigitalMitra</h3>
      <div class="language-selector">
        <button class="lang-btn active" data-lang="english">English</button>
        <button class="lang-btn" data-lang="marathi">मराठी</button>
      </div>
    </div>
    <div class="chat-messages"></div>
    <div class="chat-input">
      <input type="text" placeholder="Ask me anything..." id="user-input">
      <button id="send-btn">Send</button>
    </div>
  `;
  
  document.body.appendChild(chatbotContainer);
  
  // Toggle chat visibility when clicking on the chat toggle button
  chatToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling to document
    chatbotContainer.classList.toggle('hidden');
    chatToggle.style.display = chatbotContainer.classList.contains('hidden') ? 'flex' : 'none';
    
    // If opening the chat for the first time, show welcome message
    if (!chatbotContainer.classList.contains('hidden')) {
      const chatMessages = document.querySelector('.chat-messages');
      
      // Load saved chat from sessionStorage if available
      const savedChat = sessionStorage.getItem('digitalMitraChat');
      const savedLanguage = sessionStorage.getItem('digitalMitraLanguage');
      const savedLoginState = sessionStorage.getItem('digitalMitraLoginState');
      const savedLoginAsked = sessionStorage.getItem('digitalMitraLoginAsked');
      const savedProfileAsked = sessionStorage.getItem('digitalMitraProfileAsked');
      
      if (savedChat && chatMessages.innerHTML === '') {
        chatMessages.innerHTML = savedChat;
        
        // Restore language state
        if (savedLanguage) {
          currentLanguage = savedLanguage;
          document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === savedLanguage) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
        
        // Restore conversation state variables
        if (savedLoginState) {
          isLoggedIn = savedLoginState === 'true' ? true : 
                       savedLoginState === 'false' ? false : null;
        }
        
        if (savedLoginAsked) {
          isLoginAsked = savedLoginAsked === 'true';
        }
        
        if (savedProfileAsked) {
          isProfileQuestionAsked = savedProfileAsked === 'true';
        }
        
        // Update input placeholder based on language
        const inputPlaceholder = currentLanguage === 'english' ? 
          "Ask me anything..." : "मला काहीही विचारा...";
        document.getElementById('user-input').placeholder = inputPlaceholder;
      } 
      else if (chatMessages.children.length === 0) {
        showWelcomeMessage();
      }
      chatbotContainer.setAttribute('data-initialized', 'true');
    }
  });
  
  // Hide chat when clicking outside the chatbot
  document.addEventListener('click', (e) => {
    // Check if the click is outside the chatbot container and the chat is visible
    if (!chatbotContainer.classList.contains('hidden') && 
        !chatbotContainer.contains(e.target) && 
        e.target !== chatToggle) {
      chatbotContainer.classList.add('hidden');
      chatToggle.style.display = 'flex';
    }
  });
  
  // Prevent chat from closing when clicking inside the chatbot
  chatbotContainer.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop click event from bubbling up to document
  });
  
  // Set up event listeners
  let currentLanguage = digitalMitraConfig.defaultLanguage;
  let isLoginAsked = false;
  let isLoggedIn = null;
  let isProfileQuestionAsked = false;
  
  // Check for saved state in sessionStorage
  const savedLanguage = sessionStorage.getItem('digitalMitraLanguage');
  if (savedLanguage && digitalMitraConfig.languages.includes(savedLanguage)) {
    currentLanguage = savedLanguage;
  }
  
  const savedLoginAsked = sessionStorage.getItem('digitalMitraLoginAsked');
  if (savedLoginAsked) {
    isLoginAsked = savedLoginAsked === 'true';
  }
  
  const savedLoginState = sessionStorage.getItem('digitalMitraLoginState');
  if (savedLoginState) {
    isLoggedIn = savedLoginState === 'true' ? true : 
                 savedLoginState === 'false' ? false : null;
  }
  
  const savedProfileAsked = sessionStorage.getItem('digitalMitraProfileAsked');
  if (savedProfileAsked) {
    isProfileQuestionAsked = savedProfileAsked === 'true';
  }
  
  // Language toggle functionality
  document.querySelectorAll('.lang-btn').forEach(btn => {
    // Set initial active state based on saved language
    if (btn.getAttribute('data-lang') === currentLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLanguage = btn.getAttribute('data-lang');
      
      // Save language selection to sessionStorage
      sessionStorage.setItem('digitalMitraLanguage', currentLanguage);
      
      // Update placeholder text based on language
      const inputPlaceholder = currentLanguage === 'english' ? 
        "Ask me anything..." : "मला काहीही विचारा...";
      document.getElementById('user-input').placeholder = inputPlaceholder;
      
      // Reset login status when language changes
      isLoginAsked = false;
      isLoggedIn = null;
      isProfileQuestionAsked = false;
      
      // Update the session storage
      sessionStorage.setItem('digitalMitraLoginAsked', 'false');
      sessionStorage.setItem('digitalMitraLoginState', '');
      sessionStorage.setItem('digitalMitraProfileAsked', 'false');
      
      // Show welcome message in new language
      showWelcomeMessage();
    });
  });
  
  // Message sending functionality
  const sendButton = document.getElementById('send-btn');
  const userInput = document.getElementById('user-input');
  
  sendButton.addEventListener('click', () => {
    sendMessage();
  });
  
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const query = userInput.value.trim();
    if (!query) return;
    
    // Add user message to chat
    addMessageToChat('user', query);
    
    // Check if we need to handle login question
    if (isLoginAsked && isLoggedIn === null) {
      handleLoginResponse(query);
    } else if (isProfileQuestionAsked) {
      handleProfileResponse(query);
    } else {
      // Get bot response
      const response = digitalMitraConfig.handleQuery(query, currentLanguage);
      
      // Add bot response to chat after a small delay to mimic thinking
      setTimeout(() => {
        addMessageToChat('bot', response);
      }, 500);
    }
    
    // Clear input
    userInput.value = '';
  }
  
  function addMessageToChat(sender, message) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    
    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save chat history to sessionStorage
    sessionStorage.setItem('digitalMitraChat', chatMessages.innerHTML);
    sessionStorage.setItem('digitalMitraLoginAsked', isLoginAsked.toString());
    sessionStorage.setItem('digitalMitraProfileAsked', isProfileQuestionAsked.toString());
    if (isLoggedIn !== null) {
      sessionStorage.setItem('digitalMitraLoginState', isLoggedIn.toString());
    }
  }
  
  function showWelcomeMessage() {
    const chatMessages = document.querySelector('.chat-messages');
    // Clear existing messages
    chatMessages.innerHTML = '';
    
    // Add welcome message
    const welcomeMessage = currentLanguage === 'english' 
      ? "Hello! I'm DigitalMitra. Welcome to our website!"
      : "नमस्कार! मी डिजिटलमित्र आहे. आमच्या वेबसाइटवर आपले स्वागत आहे!";
    
    setTimeout(() => {
      addMessageToChat('bot', welcomeMessage);
      
      // Ask about login after a short delay
      setTimeout(() => {
        const loginQuestion = currentLanguage === 'english' 
          ? "Did you login to your account? (Please respond with 'yes' or 'no')"
          : "आपण आपल्या खात्यात लॉगिन केले आहे का? (कृपया 'हो' किंवा 'नाही' सह प्रतिसाद द्या)";
        
        addMessageToChat('bot', loginQuestion);
        isLoginAsked = true;
        sessionStorage.setItem('digitalMitraLoginAsked', 'true');
      }, 800);
    }, 300);
  }
  
  function handleLoginResponse(response) {
    const normalizedResponse = response.toLowerCase();
    
    // Check for yes/no in both languages
    if (normalizedResponse === 'yes' || normalizedResponse === 'y' || 
        normalizedResponse === 'हो' || normalizedResponse === 'होय') {
      isLoggedIn = true;
      sessionStorage.setItem('digitalMitraLoginState', 'true');
      
      // Provide response for logged in users
      const loggedInMessage = currentLanguage === 'english' 
        ? "Great! You can access your order history, saved items, and personalized recommendations. How can I help you today?"
        : "छान! आपण आपला ऑर्डर इतिहास, सेव्ह केलेल्या वस्तू आणि वैयक्तिकृत शिफारसी ऍक्सेस करू शकता. मी आज आपली कशी मदत करू शकतो?";
      
      setTimeout(() => {
        addMessageToChat('bot', loggedInMessage);
      }, 500);
    } 
    else if (normalizedResponse === 'no' || normalizedResponse === 'n' || 
             normalizedResponse === 'नाही') {
      isLoggedIn = false;
      sessionStorage.setItem('digitalMitraLoginState', 'false');
      
      // Provide response for non-logged in users
      const notLoggedInMessage = currentLanguage === 'english' 
        ? "No problem! first login/register to our website. are you done logging in?"
        : "काही समस्या नाही! प्रथम आमच्या वेबसाइटवर लॉगिन/नोंदणी करा. तुम्ही लॉगिन पूर्ण केले का?";
      
      setTimeout(() => {
        addMessageToChat('bot', notLoggedInMessage);
        isProfileQuestionAsked = true;
        sessionStorage.setItem('digitalMitraProfileAsked', 'true');
      }, 500);
    } 
    else {
      // Handle invalid response
      const invalidResponseMessage = currentLanguage === 'english' 
        ? "I didn't understand that. Please reply with 'yes' or 'no'."
        : "मला ते समजले नाही. कृपया 'हो' किंवा 'नाही' सह उत्तर द्या.";
      
      setTimeout(() => {
        addMessageToChat('bot', invalidResponseMessage);
      }, 500);
      
      // Keep isLoggedIn as null to ask again
      isLoggedIn = null;
      sessionStorage.setItem('digitalMitraLoginState', '');
    }
  }
  
  function handleProfileResponse(response) {
    const normalizedResponse = response.toLowerCase();
    
    if (normalizedResponse === 'yes' || normalizedResponse === 'y' || 
        normalizedResponse === 'हो' || normalizedResponse === 'होय') {
      
      // Provide response for users who completed login
      const profileCompletionMessage = currentLanguage === 'english' 
        ? "Great! Then complete your profile after that you can see all government schemes which are applicable for you in your scheme! Do you have any further questions?"
        : "छान! नंतर आपली प्रोफाइल पूर्ण करा, त्यानंतर आपल्यासाठी लागू असलेल्या सर्व सरकारी योजना तुम्ही पाहू शकता. तुम्हाला आणखी काही प्रश्न आहेत का?";
      
      setTimeout(() => {
        addMessageToChat('bot', profileCompletionMessage);
        isProfileQuestionAsked = false; // Reset to handle regular queries
        sessionStorage.setItem('digitalMitraProfileAsked', 'false');
      }, 500);
    } 
    else if (normalizedResponse === 'no' || normalizedResponse === 'n' || 
             normalizedResponse === 'नाही') {
      
      // Provide response for users who haven't completed login
      const notCompletedLoginMessage = currentLanguage === 'english' 
        ? "No problem! You can view all features in our website! But to view the schemes which are applicable for you, first you need to complete your profile."
        : "काही समस्या नाही! तुम्ही आमच्या वेबसाइटवरील सर्व वैशिष्ट्ये पाहू शकता! पण तुमच्यासाठी लागू असलेल्या योजना पाहण्यासाठी, प्रथम तुम्हाला तुमची प्रोफाइल पूर्ण करावी लागेल.";
      
      setTimeout(() => {
        addMessageToChat('bot', notCompletedLoginMessage);
        isProfileQuestionAsked = false; // Reset to handle regular queries
        sessionStorage.setItem('digitalMitraProfileAsked', 'false');
      }, 500);
    } 
    else {
      // Handle invalid response
      const invalidResponseMessage = currentLanguage === 'english' 
        ? "I didn't understand that. Please reply with 'yes' or 'no'."
        : "मला ते समजले नाही. कृपया 'हो' किंवा 'नाही' सह उत्तर द्या.";
      
      setTimeout(() => {
        addMessageToChat('bot', invalidResponseMessage);
      }, 500);
      
      // Keep asking the profile question
      isProfileQuestionAsked = true;
      sessionStorage.setItem('digitalMitraProfileAsked', 'true');
    }
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeDigitalMitra();
});

// Export functions for external use
window.DigitalMitra = {
  initialize: initializeDigitalMitra,
  config: digitalMitraConfig,
  
  // Add a method to update the knowledge base
  updateKnowledgeBase: function(language, key, value) {
    if (digitalMitraConfig.languages.includes(language)) {
      digitalMitraConfig.knowledgeBase[language][key] = value;
      return true;
    }
    return false;
  },
  
  // Add a method to add a new question and answer
  addQnA: function(language, question, answer) {
    if (digitalMitraConfig.languages.includes(language)) {
      digitalMitraConfig.knowledgeBase[language][question.toLowerCase()] = answer;
      return true;
    }
    return false;
  },
  
  // Add method to manually show/hide chatbot
  toggleChatbot: function(show) {
    const chatbotContainer = document.querySelector('.digitalmitra-container');
    const chatToggle = document.querySelector('.chat-toggle');
    
    if (!chatbotContainer) return false;
    
    if (show === true) {
      chatbotContainer.classList.remove('hidden');
      chatToggle.style.display = 'none';
    } else if (show === false) {
      chatbotContainer.classList.add('hidden');
      chatToggle.style.display = 'flex';
    } else {
      chatbotContainer.classList.toggle('hidden');
      chatToggle.style.display = chatbotContainer.classList.contains('hidden') ? 'flex' : 'none';
    }
    
    return true;
  },
  
  // Add method to clear chat history
  clearChatHistory: function() {
    sessionStorage.removeItem('digitalMitraChat');
    sessionStorage.removeItem('digitalMitraLanguage');
    sessionStorage.removeItem('digitalMitraLoginState');
    sessionStorage.removeItem('digitalMitraLoginAsked');
    sessionStorage.removeItem('digitalMitraProfileAsked');
    
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.innerHTML = '';
    }
    
    return true;
  }
};