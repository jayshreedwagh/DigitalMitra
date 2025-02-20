document.addEventListener("DOMContentLoaded", function () {
    const fields = document.querySelectorAll("input[type='text'], input[type='email'], input[type='number'], input[type='tel'], input[type='date']");
    const saveBtn = document.getElementById("save-btn");
    const progressBar = document.getElementById("progress");
    const profileImg = document.getElementById("profile-img");
    const uploadImg = document.getElementById("upload-img");

    // Load saved data from localStorage
    fields.forEach(field => {
        field.value = localStorage.getItem(field.id) || "";
    });

    profileImg.src = localStorage.getItem("profileImg") || "default-avatar.png";

    // Function to calculate profile completion percentage
    function updateProgress() {
        let filledFields = 0;
        fields.forEach(field => {
            if (field.value.trim() !== "") filledFields++;
        });

        const completion = Math.round((filledFields / fields.length) * 100);
        progressBar.style.width = `${completion}%`;
        progressBar.textContent = `${completion}% Completed`;
    }

    // Save data & update progress
    saveBtn.addEventListener("click", function () {
        fields.forEach(field => {
            localStorage.setItem(field.id, field.value);
        });
        updateProgress();
        alert("Profile saved successfully!");
    });

    // Update progress on input change
    fields.forEach(field => {
        field.addEventListener("input", updateProgress);
    });

    // Handle Profile Picture Upload
    uploadImg.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
                localStorage.setItem("profileImg", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Initial progress calculation
    updateProgress();
});
