// Navbar
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Home 
const professions = ["A Software Developer", "A Problem Solver", "A Tech Enthusiast"];
let i = 0;

function typeText() {
    const dynamicText = document.querySelector(".dynamic-text");
    dynamicText.textContent = professions[i];
    i = (i + 1) % professions.length;
}

setInterval(typeText, 2000);
