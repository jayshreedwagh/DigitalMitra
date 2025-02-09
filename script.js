function login() {
    window.location.href="login.html";
}

function register() {
    window.location.href="registration.html";

}
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    this.reset();
});
