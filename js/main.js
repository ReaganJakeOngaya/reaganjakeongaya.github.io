// Main JavaScript file - Initializes all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initTheme();
    initNavigation();
    initAnimations();
    initForms();
    initScrollEffects();
    
    console.log('Portfolio initialized successfully!');
});

// Scroll effects
function initScrollEffects() {
    const scrollToTop = document.getElementById('scroll-to-top');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}