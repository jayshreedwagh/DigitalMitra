function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}

// Function to change language and store it
function changeLanguage() {
    var languageSelector = document.getElementById("customLanguageSelector");
    var selectedLanguage = languageSelector.value;

    if (selectedLanguage) {
        localStorage.setItem("selectedLanguage", selectedLanguage);
        applyStoredLanguage();
    }
}

// Function to apply stored language
function applyStoredLanguage() {
    var storedLanguage = localStorage.getItem("selectedLanguage");

    if (storedLanguage) {
        var languageSelector = document.getElementById("customLanguageSelector");
        if (languageSelector) {
            languageSelector.value = storedLanguage;
        }

        // Wait for Google Translate to load before applying language
        var checkExist = setInterval(function () {
            var googleTranslateDropdown = document.querySelector(".goog-te-combo");
            if (googleTranslateDropdown) {
                googleTranslateDropdown.value = storedLanguage;
                googleTranslateDropdown.dispatchEvent(new Event('change')); // Simulate user selection
                clearInterval(checkExist);
            }
        }, 500); // Check every 500ms until it's found
    }
}

// Ensure language selection persists on all pages
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(applyStoredLanguage, 1500); // Ensure Google Translate has enough time to initialize
});
