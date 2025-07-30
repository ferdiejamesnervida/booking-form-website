// Google Sheets Form Handler
// Instructions:
// 1. Create a Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Replace the default code with the web app code below
// 4. Deploy as web app and copy the URL
// 5. Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' below with your deployed URL

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const modal = document.getElementById('successModal');
    const submitBtn = document.querySelector('.submit-btn');

    // Form validation (same as before)
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

    // Form submission with Google Sheets
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Send to Google Sheets
            await sendToGoogleSheets(data);

            showSuccessModal();
            form.reset();

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your request. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    async function sendToGoogleSheets(data) {
        const googleAppsScriptUrl = 'YOUR_NEW_DEPLOYMENT_URL_HERE'; // Replace with your new deployment URL
        
        const payload = {
            timestamp: new Date().toISOString(),
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role || '',
            email: data.email,
            phone: data.phone || '',
            messageType: data.messageType || '',
            organization: data.organization || '',
            orgType: data.orgType || '',
            eventTitle: data.eventTitle || '',
            eventDate: data.eventDate || '',
            eventTime: data.eventTime || '',
            venue: data.venue || '',
            venueType: data.venueType || '',
            audienceType: data.audienceType || '',
            attendees: data.attendees || '',
            otherSpeakers: data.otherSpeakers || '',
            suggestedTopic: data.suggestedTopic || '',
            speakingDuration: data.speakingDuration || '',
            budget: data.budget || '',
            otherInstructions: data.otherInstructions || ''
        };

        const response = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Important for cross-origin requests
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Since we're using no-cors, we can't check the response status
        // The success is assumed if no error is thrown
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
    }

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