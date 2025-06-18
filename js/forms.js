document.addEventListener('DOMContentLoaded', function () {
    // ======================
    // 1. Form Configuration
    // ======================
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    const formSubmitBtn = contactForm.querySelector('.form-submit');
    const btnLoader = formSubmitBtn?.querySelector('.btn-loader');
    const btnTextSpan = formSubmitBtn?.querySelector('span');
    const originalBtnText = btnTextSpan?.textContent || 'Send Message';
    let isRedirecting = false; // Flag to prevent multiple redirects

    // ======================
    // 2. Core Functions
    // ======================
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');

                // Email format validation
                if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (isRedirecting) return; // Prevent multiple submissions
        if (!validateForm()) {
            showToast('Please fill all required fields correctly', 'error');
            return;
        }

        setLoadingState(true);
        isRedirecting = true;

        try {
            // Get form values
            const name = contactForm.querySelector('[name="user_name"]').value;
            const email = contactForm.querySelector('[name="user_email"]').value;
            const subject = contactForm.querySelector('[name="subject"]').value;
            const message = contactForm.querySelector('[name="message"]').value;

            // Format the WhatsApp message
            const whatsappMessage = `\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Your WhatsApp number (remove any non-digit characters)
            const whatsappNumber = '254759095501'.replace(/\D/g, '');
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Show success message
            showToast('Message ready! Redirecting to WhatsApp...', 'success', 3500);
            
            // Reset form immediately
            contactForm.reset();
            
            // Delay the redirect by 4 seconds (4000 milliseconds)
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                isRedirecting = false;
                setLoadingState(false);
            }, 4000);

        } catch (error) {
            console.error('Error:', error);
            isRedirecting = false;
            setLoadingState(false);
            showToast('Failed to prepare message. Please try again.', 'error', 5000);
        }
    }

    function setLoadingState(isLoading) {
        if (!formSubmitBtn) return;

        formSubmitBtn.disabled = isLoading;
        if (btnTextSpan) {
            btnTextSpan.textContent = isLoading ? 'Preparing message...' : originalBtnText;
        }
        if (btnLoader) {
            btnLoader.style.display = isLoading ? 'block' : 'none';
        }
    }

    // ======================
    // 3. Event Listeners
    // ======================
    contactForm.addEventListener('submit', handleFormSubmit);

    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function () {
            if (this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });

    // ======================
    // 4. Toast Notification System
    // ======================
    function showToast(message, type, duration = 3000) {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('toast-show'), 10);

        // Auto-dismiss
        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Inject toast styles if not present
    if (!document.querySelector('style#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 24px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 9999;
                max-width: 90%;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                pointer-events: none;
            }
            .toast-show {
                opacity: 1;
                transform: translateX(-50%) translateY(-10px);
            }
            .toast-success {
                background-color: #4CAF50;
            }
            .toast-error {
                background-color: #F44336;
            }
            @media (max-width: 600px) {
                .toast {
                    width: 90%;
                    padding: 10px 16px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }
});