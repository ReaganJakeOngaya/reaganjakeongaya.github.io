// ===== ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollAnimations();
    initSkillBarAnimations();
    initProjectCardAnimations();
    initServiceCardAnimations();
    initContactFormAnimations();
    initScrollIndicator();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Animate elements when they come into view
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

// ===== SKILL BAR ANIMATIONS =====
function initSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barPosition < windowHeight - 100) {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
                bar.style.opacity = '1';
            }
        });
    };
    
    // Run once on load
    animateSkillBars();
    
    // Run on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// ===== PROJECT CARD ANIMATIONS =====
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(100%)';
        });
    });
}

// ===== SERVICE CARD ANIMATIONS =====
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    });
}

// ===== CONTACT FORM ANIMATIONS =====
function initContactFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', function() {
            label.style.transform = 'translateY(-25px)';
            label.style.fontSize = 'var(--text-sm)';
            label.style.color = 'var(--primary-400)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                label.style.transform = 'translateY(0)';
                label.style.fontSize = 'var(--text-base)';
                label.style.color = 'var(--neutral-400)';
            }
        });
        
        // Initialize labels based on existing values
        if (input.value) {
            label.style.transform = 'translateY(-25px)';
            label.style.fontSize = 'var(--text-sm)';
            label.style.color = 'var(--primary-400)';
        }
    });
}

// ===== SCROLL INDICATOR ANIMATION =====
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    const scrollLine = scrollIndicator.querySelector('.scroll-line');
    let animationFrame;
    
    const animateScrollLine = function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;
        const scrollPercentage = (scrollPosition / maxScroll) * 100;
        
        scrollLine.style.height = `${scrollPercentage}%`;
        animationFrame = requestAnimationFrame(animateScrollLine);
    };
    
    // Start animation
    animateScrollLine();
    
    // Clean up on scroll indicator removal
    const observer = new MutationObserver(function() {
        if (!document.contains(scrollIndicator)) {
            cancelAnimationFrame(animationFrame);
            observer.disconnect();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}

// ===== HERO TEXT ANIMATION =====
function initHeroTextAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroDescription) {
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 600);
    }
}

// Initialize hero animation on load
window.addEventListener('load', initHeroTextAnimation);

// ===== SECTION ENTRY ANIMATIONS =====
function initSectionEntryAnimations() {
    const sections = document.querySelectorAll('section');
    
    const animateSections = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 200) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial state
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
    });
    
    // Run once on load
    animateSections();
    
    // Run on scroll
    window.addEventListener('scroll', animateSections);
}

// Initialize section animations
initSectionEntryAnimations();

// ===== BUTTON HOVER ANIMATIONS =====
function initButtonHoverAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize button animations
initButtonHoverAnimations();