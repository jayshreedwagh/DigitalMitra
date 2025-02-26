document.addEventListener("DOMContentLoaded", function () {
    const schemeToggle = document.getElementById("schemeToggle");
    const recommendedSchemes = document.getElementById("recommendedSchemes");
    const appliedSchemes = document.getElementById("appliedSchemes");
    const toggleText = document.getElementById("toggleText");
    const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");

    // Toggle between Recommended & Applied Schemes
    schemeToggle.addEventListener("change", function () {
        if (schemeToggle.checked) {
            recommendedSchemes.classList.add("hidden");
            appliedSchemes.classList.remove("hidden");
            toggleText.textContent = "Applied Schemes";
        } else {
            recommendedSchemes.classList.remove("hidden");
            appliedSchemes.classList.add("hidden");
            toggleText.textContent = "Recommended Schemes";
        }
    });

    // Search Functionality
    searchBar.addEventListener("input", function () {
        const searchText = searchBar.value.toLowerCase();
        document.querySelectorAll(".scheme-card").forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(searchText) ? "block" : "none";
        });
    });

    // Category Filtering
    categoryFilter.addEventListener("change", function () {
        const selectedCategory = categoryFilter.value;
        document.querySelectorAll(".scheme-card").forEach(card => {
            const category = card.getAttribute("data-category");
            if (selectedCategory === "all" || category === selectedCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
