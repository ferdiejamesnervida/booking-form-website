# Email Setup Guide for Booking Form

## Quick Fix - Test the Form Now

The form is now set to **simulate email sending** so you can test it immediately. When you submit the form, it will:
1. Show the success message
2. Log the email content to the browser console (press F12 to see it)
3. Reset the form

## Permanent Email Solutions

Choose one of these options for actual email functionality:

### Option 1: Formspree (Easiest - Recommended)

1. **Sign up**: Go to [formspree.io](https://formspree.io) and create a free account
2. **Create form**: Click "New Form" and give it a name like "Booking Form"
3. **Get form ID**: Copy the form ID (looks like `xrgjabab`)
4. **Update code**: Replace the `sendEmail` function in `script.js` with this:

```javascript
async function sendEmail(data) {
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

    // Send email using Formspree
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID_HERE', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'contact@ferdienervida.com',
            subject: `New Booking Request from ${data.firstName} ${data.lastName}`,
            message: emailContent
        })
    });

    if (!response.ok) {
        throw new Error('Failed to send email');
    }

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));
}
```

5. **Replace YOUR_FORM_ID_HERE** with your actual Formspree form ID
6. **Test**: Submit the form and check your email

### Option 2: EmailJS (More Features)

1. **Sign up**: Go to [emailjs.com](https://www.emailjs.com) and create an account
2. **Add Email Service**: Connect your Gmail, Outlook, or other email service
3. **Create Template**: Create an email template with variables like `{{from_name}}`, `{{message}}`
4. **Get Credentials**: Note your Service ID, Template ID, and User ID
5. **Update HTML**: Add these lines to the `<head>` section of `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_USER_ID");
</script>
```

6. **Replace script.js**: Use the `script-emailjs.js` file instead of `script.js`
7. **Update IDs**: Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` in the file

### Option 3: Netlify Forms (If hosting on Netlify)

1. **Deploy**: Upload your files to Netlify
2. **Update HTML**: Add `netlify` attribute to the form tag:

```html
<form id="bookingForm" class="booking-form" netlify>
```

3. **Remove JavaScript email code**: Netlify will handle form submissions automatically
4. **Configure**: Set up email notifications in Netlify dashboard

## Testing Your Setup

1. **Fill out the form** with test data
2. **Submit** and check for success message
3. **Check your email** (contact@ferdienervida.com)
4. **Check browser console** (F12) for any error messages

## Troubleshooting

### "Failed to send email" error:
- Check your form ID/credentials are correct
- Verify your email service is active
- Check browser console for specific error messages

### No emails received:
- Check spam folder
- Verify email address is correct
- Test with a different email address

### Form not submitting:
- Check JavaScript is enabled
- Verify all required fields are filled
- Check for console errors

## Quick Test Right Now

The form should work immediately for testing. Try filling it out and submitting - you should see the success message and the email content in the browser console (press F12 → Console tab).

Need help? Contact me with any specific error messages you see! 