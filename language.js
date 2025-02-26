function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
    );
}

function changeLanguage(lang) {
    if (lang === "") return; // If no language selected, do nothing

    // Find the Google Translate dropdown and change its value
    let googleDropdown = document.querySelector(".goog-te-combo");
    if (googleDropdown) {
        googleDropdown.value = lang; // Set selected language
        googleDropdown.dispatchEvent(new Event("change")); // Trigger translation
    } else {
        console.error("Google Translate dropdown not found.");
    }
}
