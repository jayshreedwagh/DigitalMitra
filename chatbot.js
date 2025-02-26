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
        "contact information": "You can reach us at contact@yourwebsite.com or call us at +91-XXXXXXXXXX during business hours.",
        "business hours": "We are available Monday to Friday, 9 AM to 6 PM IST.",
        "payment methods": "We accept credit cards, debit cards, UPI, and net banking for all transactions.",
        "refund policy": "Refunds are processed within 7 working days. Please refer to our refund policy page for more details.",
        "delivery": "We typically deliver within 3-5 business days across India.",
        "track order": "You can track your order by logging into your account and visiting the 'My Orders' section.",
        "return policy": "You can return most items within 7 days of delivery. Please check our return policy for specific details.",
        "about us": "We are a digital solutions provider committed to helping businesses grow online.",
        "services": "We offer web development, app development, digital marketing, and e-commerce solutions."
        // Add more Q&A pairs as needed
      },
      marathi: {
        "या वेबसाइटचा वापर कसा करावा": "आपण वरील मेनू वापरून आमच्या वेबसाइटवर नेव्हिगेट करू शकता. संबंधित श्रेणींवर क्लिक करून आमचे उत्पादने/सेवा ब्राउझ करा.",
        "संपर्क माहिती": "आपण आम्हाला contact@yourwebsite.com वर किंवा व्यवसायाच्या वेळेत +91-XXXXXXXXXX वर कॉल करून संपर्क साधू शकता.",
        "व्यावसायिक तास": "आम्ही सोमवार ते शुक्रवार, सकाळी 9 ते संध्याकाळी 6 IST पर्यंत उपलब्ध आहोत.",
        "पेमेंट पद्धती": "आम्ही सर्व व्यवहारांसाठी क्रेडिट कार्ड, डेबिट कार्ड, UPI आणि नेट बँकिंग स्वीकारतो.",
        "परतावा धोरण": "परतावा 7 कामकाजाच्या दिवसांत प्रक्रिया केला जातो. अधिक तपशीलांसाठी कृपया आमच्या परतावा धोरण पृष्ठाचा संदर्भ घ्या.",
        "डिलिव्हरी": "आम्ही सामान्यतः संपूर्ण भारतात 3-5 कामकाजाच्या दिवसांत वितरित करतो.",
        "ऑर्डर ट्रॅक करा": "आपण आपल्या खात्यात लॉग इन करून आणि 'माझे ऑर्डर' विभागात जाऊन आपला ऑर्डर ट्रॅक करू शकता.",
        "परत करण्याचे धोरण": "आपण डिलिव्हरीच्या 7 दिवसांच्या आत बहुतेक वस्तू परत करू शकता. विशिष्ट तपशीलांसाठी कृपया आमचे परत करण्याचे धोरण तपासा.",
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
      if (!chatbotContainer.classList.contains('hidden') && 
          !chatbotContainer.hasAttribute('data-initialized')) {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages.children.length === 0) {
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
    
    // Language toggle functionality
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.getAttribute('data-lang');
        
        // Update placeholder text based on language
        const inputPlaceholder = currentLanguage === 'english' ? 
          "Ask me anything..." : "मला काहीही विचारा...";
        document.getElementById('user-input').placeholder = inputPlaceholder;
        
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
      
      // Get bot response
      const response = digitalMitraConfig.handleQuery(query, currentLanguage);
      
      // Add bot response to chat after a small delay to mimic thinking
      setTimeout(() => {
        addMessageToChat('bot', response);
      }, 500);
      
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
    }
    
    function showWelcomeMessage() {
      const chatMessages = document.querySelector('.chat-messages');
      // Clear existing messages
      chatMessages.innerHTML = '';
      
      // Add welcome message
      const welcomeMessage = currentLanguage === 'english' 
        ? "Hello! I'm DigitalMitra. How can I help you today?"
        : "नमस्कार! मी डिजिटलमित्र आहे. मी आज आपली कशी मदत करू शकतो?";
      
      setTimeout(() => {
        addMessageToChat('bot', welcomeMessage);
      }, 300);
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
    }
  };