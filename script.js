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
// const scrollContainer = document.getElementById('scrollContainer');
// const imageCards = document.querySelectorAll('.image-card');
// const leftArrow = document.getElementById('leftArrow');
// const rightArrow = document.getElementById('rightArrow');
// let currentIndex = 0;
// const intervalTime = 3000;  // 3 seconds
// let autoScrollInterval;

const track = document.getElementById('carouselTrack');
const slides = document.getElementsByClassName('carousel-slide');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const autoScrollDelay = 3000; // 3 seconds

let currentIndex = 1; // Start at 1 because we have a clone at 0
let isTransitioning = false;
let autoScrollInterval = null;

// Function to update slide position
function updateSlidePosition(transition = true) {
    track.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Set initial position
updateSlidePosition();

// Function to move to next/previous slide
function moveToSlide(direction) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    track.style.transition = 'transform 0.5s ease-in-out';
    currentIndex += direction;
    updateSlidePosition();
}

// Function to handle transition end
function handleTransitionEnd() {
    isTransitioning = false;
    
    // If we're at the clone slide, jump to the real slide
    if (currentIndex === 0) {
        track.style.transition = 'none';
        currentIndex = slides.length - 2;
        updateSlidePosition(false);
    } else if (currentIndex === slides.length - 1) {
        track.style.transition = 'none';
        currentIndex = 1;
        updateSlidePosition(false);
    }
}

// Function to start auto-scrolling
function startAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
    autoScrollInterval = setInterval(() => moveToSlide(1), autoScrollDelay);
}

// Function to stop auto-scrolling
function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// Event Listeners
nextButton.addEventListener('click', () => moveToSlide(1));
prevButton.addEventListener('click', () => moveToSlide(-1));
track.addEventListener('transitionend', handleTransitionEnd);

// Pause on hover
track.addEventListener('mouseenter', stopAutoScroll);
track.addEventListener('mouseleave', startAutoScroll);

// Start auto-scroll
startAutoScroll();