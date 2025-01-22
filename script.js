// Navbar Toggle with Animation
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("open");
});

// Highlight Active Link on Scroll
const sections = document.querySelectorAll("section");
const navLinksItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 60;
        if (scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinksItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
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

// Initialize EmailJS
    (function () {
      emailjs.init("Mrso7_FykxfQLxVaR"); // Replace "YOUR_USER_ID" with your EmailJS user ID
    })();

    // Form submission handler
    document.getElementById("contact-form").addEventListener("submit", function (event) {
      event.preventDefault();

      // Replace these values with your EmailJS Service ID and Template ID
      const serviceID = "service_sw7fxnu";
      const templateID = "template_hhmg7bd";

      emailjs.sendForm(serviceID, templateID, this).then(
        (response) => {
          alert("Message sent successfully!");
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          alert("Failed to send the message. Please try again.");
          console.error("FAILED...", error);
        }
      );
    });