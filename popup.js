export function showPopup(message, isSuccess = true, redirectUrl = null) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const closeBtn = document.getElementById("close-popup");

    popupMessage.textContent = message;
    popup.style.display = "block";  // ✅ Make it visible
    popup.style.top = "20px";  // ✅ Appear at the top
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = "white";  // ✅ Keep background white

    // ✅ Add border color based on success or error
    popup.style.border = isSuccess ? "3px solid #4CAF50" : "3px solid #F44336";
    popupMessage.style.color = isSuccess ? "#4CAF50" : "#F44336"; // ✅ Change text color

    // Close popup on button click
    closeBtn.onclick = function () {
        popup.style.display = "none";
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };
}
