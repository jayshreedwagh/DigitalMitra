// Import Firebase config
import { db } from "./firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Navigation Functions
window.login = function() {
    window.location.href = "login.html";
};

window.register = function() {
    window.location.href = "register.html";
};

// Remove the test function call
// Test Firestore Write - this is not needed anymore
const scrollContainer = document.getElementById('scrollContainer');
const imageCards = document.querySelectorAll('.image-card');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
let currentIndex = 0;
const intervalTime = 3000;  // 3 seconds
let autoScrollInterval;

// Function to handle auto-scrolling
function autoScroll() {
  currentIndex++;

  // Reset to first image after the last image
  if (currentIndex >= imageCards.length) {
    currentIndex = 0;
    scrollContainer.style.transition = 'none';
    scrollContainer.style.transform = 'translateX(0)';
    setTimeout(() => {
      scrollContainer.style.transition = 'transform 0.5s ease';
    }, 50);
  } else {
    const scrollAmount = currentIndex * (imageCards[0].clientWidth + 20);
    scrollContainer.style.transform = 'translateX(-${scrollAmount}px)';
  }
}

// Function to start auto-scrolling
function startAutoScroll() {
  autoScrollInterval = setInterval(autoScroll, intervalTime);
}

// Function to stop auto-scrolling
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  
  // Pause on hover
  scrollContainer.addEventListener('mouseover', stopAutoScroll);
  scrollContainer.addEventListener('mouseout', startAutoScroll);
  
  // Manual navigation
  rightArrow.addEventListener('click', () => {
    stopAutoScroll();
    currentIndex++;
    if (currentIndex >= imageCards.length) currentIndex = 0;
    const scrollAmount = currentIndex * (imageCards[0].clientWidth + 20);
    scrollContainer.style.transform = 'translateX(-${scrollAmount}px)';
    startAutoScroll();
  });
  
  leftArrow.addEventListener('click', () => {
    stopAutoScroll();
    currentIndex--;
    if (currentIndex < 0) currentIndex = imageCards.length - 1;
    const scrollAmount = currentIndex * (imageCards[0].clientWidth + 20);
    scrollContainer.style.transform = 'translateX(-${scrollAmount}px)';
    startAutoScroll();
  });
  
  // Start auto-scrolling on page load
  startAutoScroll();