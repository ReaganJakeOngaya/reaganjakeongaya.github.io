// Navbar
// Mobile Button
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links a");

mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
// 


// Home 
const professions = ["A Software Developer", "A Problem Solver", "A Tech Enthusiast"];
let i = 0;

function typeText() {
    const dynamicText = document.querySelector(".dynamic-text");
    dynamicText.textContent = professions[i];
    i = (i + 1) % professions.length;
}

setInterval(typeText, 2000);

// Highlight active link based on scroll position
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll-to-Top Button Functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    // Show the button when scrolled down 200px
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    // Smooth scroll to the top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
