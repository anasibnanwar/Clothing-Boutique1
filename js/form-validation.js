/**
 * Form Validation JavaScript for Clothing Boutique Website
 * Author: Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Check if there's a product parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');
        
        if (productId) {
            // Pre-fill subject with product inquiry
            const subjectField = document.getElementById('subject');
            if (subjectField) {
                subjectField.value = `Product Inquiry (ID: ${productId})`;
            }
        }
        
        // Set up form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Reset previous error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Validate fields
            let isValid = true;
            
            // Name validation
            if (!nameField.value.trim()) {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            }
            
            // Email validation
            if (!emailField.value.trim()) {
                document.getElementById('email-error').textContent = 'Please enter your email';
                isValid = false;
            } else if (!isValidEmail(emailField.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Phone validation
            if (!phoneField.value.trim()) {
                document.getElementById('phone-error').textContent = 'Please enter your phone number';
                isValid = false;
            } else if (!isValidPhone(phoneField.value)) {
                document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
                isValid = false;
            }
            
            // Subject validation
            if (!subjectField.value.trim()) {
                document.getElementById('subject-error').textContent = 'Please enter a subject';
                isValid = false;
            }
            
            // Message validation
            if (!messageField.value.trim()) {
                document.getElementById('message-error').textContent = 'Please enter your message';
                isValid = false;
            } else if (messageField.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Your message is too short';
                isValid = false;
            }
            
            // If form is valid, process submission
            if (isValid) {
                // In a real scenario, you would send this data to a server
                // For now, we just show a success message
                
                // Clear form fields
                contactForm.reset();
                
                // Show success message
                const formSuccess = document.getElementById('form-success');
                formSuccess.textContent = 'Thank you for your message! We will get back to you soon.';
                formSuccess.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }
});

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function isValidPhone(phone) {
    // Allow digits, spaces, hyphens, and plus sign
    // Must have at least 8 digits
    const phoneRegex = /^[\d\s\-+]{8,15}$/;
    return phoneRegex.test(phone);
}
