// DigitalMitra Chatbot - Fully Interactive with Menu-Based Navigation & UI

const digitalMitraConfig = {
  botName: "DigitalMitra",
  languages: ["english", "marathi"],
  defaultLanguage: "english",
  
  knowledgeBase: {
    english: {
      "how to use this website": `Before proceeding, please register if you haven't. If you are already registered, please login.<br><br>
      <div style='padding: 15px; background: #ffffff; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);'>
        <h3 style='color: #007bff; text-align: center;'>📌 Our Website Sections</h3>
        <ul style='list-style-type: none; padding-left: 0; font-size: 16px; color: #333; font-weight: bold;'>
          <li style='padding: 10px; border-bottom: 1px solid #ddd; display: flex; align-items: center;'>🏠 <span style='margin-left: 10px;'>Home: <span style='font-weight: normal;'>Navigate to the main page.</span></span></li>
          <li style='padding: 10px; border-bottom: 1px solid #ddd; display: flex; align-items: center;'>📖 <span style='margin-left: 10px;'>About Us: <span style='font-weight: normal;'>We help you discover government schemes based on your profile, ensuring you receive the benefits you qualify for.</span></span></li>
          <li style='padding: 10px; border-bottom: 1px solid #ddd; display: flex; align-items: center;'>⚙ <span style='margin-left: 10px;'>Services: <span style='font-weight: normal;'>We track all government schemes and analyze your data to suggest those that match your eligibility.</span></span></li>
          <li style='padding: 10px; border-bottom: 1px solid #ddd; display: flex; align-items: center;'>📞 <span style='margin-left: 10px;'>Contact Us: <span style='font-weight: normal;'>Get in touch with our support team.</span></span></li>
          <li style='padding: 10px; border-bottom: 1px solid #ddd; display: flex; align-items: center;'>📜 <span style='margin-left: 10px;'>Schemes: <span style='font-weight: normal;'>Browse various schemes available for users.</span></span></li>
          <li style='padding: 10px; display: flex; align-items: center;'>🔍 <span style='margin-left: 10px;'>Your Schemes: <span style='font-weight: normal;'>View personalized schemes based on your profile.</span></span></li>
        </ul>
      </div>`,
      "contact information": "Reach us at <strong>support@digitalmitra.com</strong> or call <strong>+91-9067460129</strong> (Mon-Fri, 9 AM - 6 PM IST).",
      "business hours": "We are available <strong>Monday to Friday, 9 AM - 6 PM IST</strong>.",
      "about us": "<strong>We are here to help you find all government schemes</strong> that match your eligibility criteria based on your profile. Our platform ensures that you get access to the most relevant benefits, making it easier for you to navigate and apply for the right schemes without hassle.",
      "services": "We keep track of all government schemes and your data to help you determine which schemes fit your eligibility criteria. Our platform ensures that you receive accurate and timely recommendations based on your profile.",
      "profile queries": `<strong>Profile Information:</strong>
        <ul style='text-align: left;'>
          <li>👤 Name & Age</li>
          <li>📍 Location</li>
          <li>📚 Education Qualification</li>
          <li>💼 Employment Status</li>
          <li>🏠 Income Details</li>
        </ul>
        <strong>Why Complete Your Profile?</strong>
        <ul style='text-align: left;'>
          <li>✅ Get personalized scheme recommendations</li>
          <li>✅ Access government benefits relevant to you</li>
          <li>✅ Save time by filtering out ineligible schemes</li>
        </ul>
        Complete your profile today to unlock all benefits!`,
      "reset password": "Click <strong>'Forgot Password'</strong> on the login page and follow the instructions to reset your password."
    }
  },

  getMenuOptions: function() {
    const options = [
      "1. How to use this website",
      "2. Contact information",
      "3. Business hours",
      "4. About us",
      "5. Services",
      "6. Profile Queries",
      "7. Reset password"
    ];
    return "<h3 style='text-align: center; color: #fff;'>Please select a topic by entering the number:</h3><ul style='text-align:left; font-size:16px; color:#fff; padding: 0; list-style-type: none;'><li style='padding: 8px; border-bottom: 1px solid #ddd;'>" + options.join('</li><li style="padding: 8px; border-bottom: 1px solid #ddd;">') + "</li></ul>";
  },

  getResponse: function(optionNumber) {
    const responseKeys = [
      "how to use this website",
      "contact information",
      "business hours",
      "about us",
      "services",
      "profile queries",
      "reset password"
    ];
    
    if (optionNumber >= 1 && optionNumber <= responseKeys.length) {
      return this.knowledgeBase.english[responseKeys[optionNumber - 1]];
    }
    return "Invalid selection. Please choose a valid option from the menu.";
  }
};



// UI Setup
function initializeDigitalMitraUI() {
  const chatToggle = document.createElement('div');
  chatToggle.className = 'chat-toggle';
  chatToggle.innerHTML = '💬';
  document.body.appendChild(chatToggle);

  const chatbotContainer = document.createElement('div');
  chatbotContainer.className = 'digitalmitra-container hidden';
  chatbotContainer.innerHTML = `
    <div class="chat-header">DigitalMitra <button class="close-chat">×</button></div>
    <div class="chat-messages"></div>
    <div class="chat-input">
      <input type="text" id="user-input" placeholder="Type a number from the menu...">
      <button id="send-btn">Send</button>
    </div>`;
  document.body.appendChild(chatbotContainer);

  const chatMessages = chatbotContainer.querySelector('.chat-messages');
  const userInput = chatbotContainer.querySelector('#user-input');
  const sendButton = chatbotContainer.querySelector('#send-btn');
  const closeChatButton = chatbotContainer.querySelector('.close-chat');

  chatToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('hidden');
    if (!chatbotContainer.classList.contains('hidden')) {
      setTimeout(() => {
        addMessageToChat('bot', "Hello! I'm DigitalMitra. Welcome to our website!");
        setTimeout(() => addMessageToChat('bot', digitalMitraConfig.getMenuOptions()), 500);
      }, 300);
    }
  });

  closeChatButton.addEventListener('click', () => {
    chatbotContainer.classList.add('hidden');
  });

  function sendMessage() {
    const query = userInput.value.trim();
    if (!query) return;

    addMessageToChat('user', query);
    const selectedOption = parseInt(query);
    if (!isNaN(selectedOption)) {
      setTimeout(() => addMessageToChat('bot', digitalMitraConfig.getResponse(selectedOption)), 500);
    } else {
      setTimeout(() => addMessageToChat('bot', "Invalid input. Please type a number from the menu."), 500);
    }
    userInput.value = '';
  }

  function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.innerHTML = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

document.addEventListener('DOMContentLoaded', initializeDigitalMitraUI);