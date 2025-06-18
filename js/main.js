// ===== MAIN SCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollToTop();
    initAnimations();
    initFormSubmissions();
    initDynamicText();
    initScrollSpy();
});

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationType = element.getAttribute('data-animate');
                element.style.animation = `${animationType} 0.6s forwards ease-out`;
                element.style.opacity = '1';
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
}

// ===== FORM SUBMISSIONS =====
function initFormSubmissions() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit');
            const loader = submitBtn.querySelector('.btn-loader');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Sending...';
            loader.style.display = 'block';
            
            // Initialize EmailJS (make sure you've included EmailJS script)
            emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS user ID
            
            // Send form
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
                .then(function() {
                    // Success
                    submitBtn.querySelector('span').textContent = 'Message Sent!';
                    loader.style.display = 'none';
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.querySelector('span').textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, function(error) {
                    // Error
                    console.error('Failed to send message:', error);
                    submitBtn.querySelector('span').textContent = 'Error Sending';
                    loader.style.display = 'none';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.querySelector('span').textContent = 'Try Again';
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
}

// ===== DYNAMIC TEXT ANIMATION =====
function initDynamicText() {
    const dynamicText = document.getElementById('dynamic-text');
    
    if (dynamicText) {
        const words = ['Software Developer', 'Frontend Engineer', 'UI/UX Enthusiast', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            
            dynamicText.textContent = currentChar;
            
            if (!isDeleting && charIndex < currentWord.length) {
                // Typing
                charIndex++;
                setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                setTimeout(type, typingSpeed / 2);
            } else {
                // Switch words
                isDeleting = !isDeleting;
                wordIndex = (!isDeleting && wordIndex === words.length - 1) ? 0 : (!isDeleting ? wordIndex + 1 : wordIndex);
                setTimeout(type, typingSpeed * 2);
            }
        }
        
        // Start typing
        setTimeout(type, 1000);
    }
}

// ===== SCROLL SPY FOR SECTIONS =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    // Add any on-load animations here
    document.body.classList.add('loaded');
    
    // Hide preloader if you have one
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});