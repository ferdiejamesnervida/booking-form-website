// Form handling and animations
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const modal = document.getElementById('successModal');
    const submitBtn = document.querySelector('.submit-btn');

    // Add animation to form elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe form groups for animation
    document.querySelectorAll('.form-group').forEach(group => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(group);
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email'];
        
        // Clear previous error states
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.form-input.error, .form-select.error').forEach(field => {
            field.classList.remove('error');
        });

        // Validate required fields
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate email format
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
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Send email using EmailJS or similar service
            await sendEmail(data);

            // Show success modal
            showSuccessModal();

            // Reset form
            form.reset();

        } catch (error) {
            console.error('Error sending email:', error);
            alert('There was an error sending your request. Please try again or contact us directly.');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Email sending function
    async function sendEmail(data) {
        // Using EmailJS service (you'll need to set this up)
        // For now, we'll simulate the email sending
        
        // Format the email content
        const emailContent = `
New Booking Request from ${data.firstName} ${data.lastName}

Contact Information:
- Name: ${data.firstName} ${data.lastName}
- Role: ${data.role || 'Not specified'}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}
- Message Type: ${data.messageType || 'Not specified'}

Organization Details:
- Organization: ${data.organization || 'Not specified'}
- Type: ${data.orgType || 'Not specified'}

Event Details:
- Event Title: ${data.eventTitle || 'Not specified'}
- Event Date: ${data.eventDate || 'Not specified'}
- Event Time: ${data.eventTime || 'Not specified'}
- Venue: ${data.venue || 'Not specified'}
- Venue Type: ${data.venueType || 'Not specified'}
- Audience Type: ${data.audienceType || 'Not specified'}
- Estimated Attendees: ${data.attendees || 'Not specified'}
- Other Speakers: ${data.otherSpeakers || 'None'}
- Suggested Topic: ${data.suggestedTopic || 'Not specified'}
- Speaking Duration: ${data.speakingDuration || 'Not specified'}
- Budget: ${data.budget || 'Not specified'}
- Other Instructions: ${data.otherInstructions || 'None'}

Submitted on: ${new Date().toLocaleString()}
        `;

        // For now, we'll simulate successful email sending
        // In production, you should use EmailJS, Formspree, or similar service
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Log the email content for debugging (remove in production)
        console.log('Email content that would be sent:', emailContent);
        
        // For now, we'll just return success
        // TODO: Replace with actual email service
        return true;
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

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add input focus animations
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });

    // Add character counter for textareas
    document.querySelectorAll('.form-textarea').forEach(textarea => {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'font-size: 0.8rem; color: #666; text-align: right; margin-top: 5px;';
        textarea.parentNode.appendChild(counter);

        function updateCounter() {
            const maxLength = textarea.getAttribute('maxlength') || 1000;
            const currentLength = textarea.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#f5576c';
            } else {
                counter.style.color = '#666';
            }
        }

        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });

    // Add floating label effect
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.classList.contains('form-label')) {
            if (input.value) {
                label.classList.add('floating');
            }

            input.addEventListener('focus', function() {
                label.classList.add('floating');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.classList.remove('floating');
                }
            });

            input.addEventListener('input', function() {
                if (this.value) {
                    label.classList.add('floating');
                } else {
                    label.classList.remove('floating');
                }
            });
        }
    });

    // Add form progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        transition: width 0.3s ease;
        z-index: 1001;
    `;
    document.body.appendChild(progressBar);

    function updateProgress() {
        const requiredFields = ['firstName', 'lastName', 'email'];
        const filledFields = requiredFields.filter(field => {
            const element = document.getElementById(field);
            return element && element.value.trim();
        });
        const progress = (filledFields.length / requiredFields.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', updateProgress);
        field.addEventListener('change', updateProgress);
    });

    // Initialize progress
    updateProgress();
});

// Add CSS for floating labels
const style = document.createElement('style');
style.textContent = `
    .form-label.floating {
        transform: translateY(-25px) scale(0.85);
        color: #667eea;
        font-weight: 600;
    }
    
    .form-group.focused .form-label {
        color: #667eea;
    }
    
    .char-counter {
        font-size: 0.8rem;
        color: #666;
        text-align: right;
        margin-top: 5px;
    }
`;
document.head.appendChild(style); 