// ===== THEME TOGGLE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    // Set initial theme based on localStorage or system preference
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Dispatch custom event for other components to listen to
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        const storedTheme = localStorage.getItem('theme');
        
        // Only change if user hasn't explicitly set a preference
        if (!storedTheme) {
            document.documentElement.setAttribute('data-theme', newSystemTheme);
            document.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: newSystemTheme }
            }));
        }
    });

    // Update theme toggle button state
    function updateToggleState() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const lightIcon = themeToggle.querySelector('.theme-icon-light');
        const darkIcon = themeToggle.querySelector('.theme-icon-dark');
        
        if (currentTheme === 'dark') {
            lightIcon.style.opacity = '0';
            lightIcon.style.transform = 'rotate(-180deg) scale(0.5)';
            darkIcon.style.opacity = '1';
            darkIcon.style.transform = 'rotate(0deg) scale(1)';
        } else {
            lightIcon.style.opacity = '1';
            lightIcon.style.transform = 'rotate(0deg) scale(1)';
            darkIcon.style.opacity = '0';
            darkIcon.style.transform = 'rotate(180deg) scale(0.5)';
        }
    }

    // Initial update
    updateToggleState();

    // Listen for theme changes to update toggle button
    document.addEventListener('themeChanged', updateToggleState);
});

// ===== THEME AWARE ELEMENTS =====
// This can be used by other components to react to theme changes
document.addEventListener('themeChanged', function(e) {
    const theme = e.detail.theme;
    
    // Example: Update elements that need to know about theme changes
    const themeAwareElements = document.querySelectorAll('[data-theme-aware]');
    
    themeAwareElements.forEach(element => {
        element.setAttribute('data-current-theme', theme);
    });
});