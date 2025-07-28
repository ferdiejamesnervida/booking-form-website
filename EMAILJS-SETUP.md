# EmailJS Setup Guide for Booking Form

## Step-by-Step EmailJS Configuration

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. **Login** to your EmailJS dashboard
2. Click **"Email Services"** in the left sidebar
3. Click **"Add New Service"**
4. Choose your email provider:
   - **Gmail**: Connect your Gmail account
   - **Outlook**: Connect your Outlook account
   - **Custom SMTP**: For other email providers
5. **Authorize** the connection
6. **Note your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. **Template Name**: "Booking Form"
4. **Subject**: `New Booking Request from {{from_name}}`
5. **Content**: Use this template:

```html
<h2>New Booking Request</h2>

<h3>Contact Information:</h3>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Role:</strong> {{role}}</p>

<h3>Organization Details:</h3>
<p><strong>Organization:</strong> {{organization}}</p>
<p><strong>Type:</strong> {{org_type}}</p>

<h3>Event Details:</h3>
<p><strong>Event Title:</strong> {{event_title}}</p>
<p><strong>Event Date:</strong> {{event_date}}</p>
<p><strong>Event Time:</strong> {{event_time}}</p>
<p><strong>Venue:</strong> {{venue}}</p>
<p><strong>Venue Type:</strong> {{venue_type}}</p>
<p><strong>Audience Type:</strong> {{audience_type}}</p>
<p><strong>Estimated Attendees:</strong> {{attendees}}</p>
<p><strong>Other Speakers:</strong> {{other_speakers}}</p>
<p><strong>Suggested Topic:</strong> {{suggested_topic}}</p>
<p><strong>Speaking Duration:</strong> {{speaking_duration}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Other Instructions:</strong> {{other_instructions}}</p>

<p><em>Submitted on: {{submission_date}}</em></p>
```

6. **Save** the template
7. **Note your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your User ID
1. Click **"Account"** in the left sidebar
2. Click **"API Keys"**
3. **Copy your Public Key** (this is your User ID)

### Step 5: Update Your Code
1. **Open `index.html`** and replace `YOUR_USER_ID` with your actual User ID:

```html
<script>
    emailjs.init("YOUR_ACTUAL_USER_ID_HERE");
</script>
```

2. **Open `script-emailjs.js`** and update these lines:

```javascript
// Replace these with your actual IDs
const response = await emailjs.send(
    'YOUR_SERVICE_ID_HERE',    // Replace with your Service ID
    'YOUR_TEMPLATE_ID_HERE',   // Replace with your Template ID
    templateParams
);
```

### Step 6: Test Your Setup
1. **Fill out the form** with test data
2. **Submit** the form
3. **Check your email** (contact@ferdienervida.com)
4. **Check browser console** (F12) for any errors

## Example Configuration

Here's what your IDs might look like:
- **User ID**: `user_a1b2c3d4e5f6g7h8i9j0`
- **Service ID**: `service_abc123`
- **Template ID**: `template_xyz789`

## Troubleshooting

### "EmailJS is not defined" error:
- Make sure the EmailJS script is loaded before your custom script
- Check that the script URL is correct

### "Service not found" error:
- Verify your Service ID is correct
- Make sure your email service is properly connected

### "Template not found" error:
- Verify your Template ID is correct
- Check that the template is saved and published

### No emails received:
- Check your spam folder
- Verify the "to_email" in the template parameters
- Test with a different email address

### Template variables not working:
- Make sure variable names match exactly (case-sensitive)
- Check that variables are properly passed in templateParams

## Advanced Configuration

### Custom Email Subject
You can modify the subject line in the template or pass it as a parameter:

```javascript
const templateParams = {
    to_email: 'contact@ferdienervida.com',
    from_name: `${data.firstName} ${data.lastName}`,
    from_email: data.email,
    subject: `New Booking Request from ${data.firstName} ${data.lastName}`,
    // ... other parameters
};
```

### Multiple Recipients
To send to multiple email addresses:

```javascript
const templateParams = {
    to_email: 'contact@ferdienervida.com, assistant@ferdienervida.com',
    // ... other parameters
};
```

### Custom Styling
You can add CSS to your email template for better formatting:

```html
<style>
    .booking-form-email {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
    }
    .section {
        margin: 20px 0;
        padding: 15px;
        background: #f9f9f9;
        border-radius: 5px;
    }
</style>
```

## Support

If you encounter any issues:
1. Check the EmailJS documentation: [docs.emailjs.com](https://docs.emailjs.com)
2. Check the browser console for error messages
3. Verify all IDs are correct
4. Test with a simple template first

Your form should now send professional emails to contact@ferdienervida.com when submitted! 