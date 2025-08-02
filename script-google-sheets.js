// Google Sheets Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const modal = document.getElementById('successModal');
    const submitBtn = document.querySelector('.submit-btn');

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email'];
        
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.form-input.error, .form-select.error').forEach(field => {
            field.classList.remove('error');
        });

        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        const emailField = document.getElementById('email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Create a new form for submission to Google Apps Script
        const googleForm = document.createElement('form');
        googleForm.method = 'POST';
        googleForm.action = 'https://script.google.com/macros/s/AKfycbzxKf5tkk9FlrYM1zD1SRl0m42RjTN8NQp-IbXkPetBUv1vh-ZwzKNYqujGAd5RMo3P/exec';
        googleForm.target = 'google-script-iframe';
        googleForm.style.display = 'none';

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Add timestamp
        data.timestamp = new Date().toISOString();

        // Add all fields as hidden inputs
        Object.keys(data).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key] || '';
            googleForm.appendChild(input);
        });

        // Create hidden iframe
        const iframe = document.createElement('iframe');
        iframe.name = 'google-script-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Add form to page and submit
        document.body.appendChild(googleForm);
        googleForm.submit();

        // Show success after a delay
        setTimeout(() => {
            showSuccessModal();
            form.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Clean up
            document.body.removeChild(googleForm);
            document.body.removeChild(iframe);
        }, 2000);
    });

    // Success modal functions
    function showSuccessModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    window.closeModal = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}); 