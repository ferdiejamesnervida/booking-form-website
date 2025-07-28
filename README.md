# Booking Form Website - Ferdie Nervida

A modern, mobile-responsive booking form website for Ferdie Nervida's speaking engagements. Features professional UI/UX design with animations and automatic email functionality.

## Features

- ✨ **Modern Design**: Clean, professional interface with gradient backgrounds and glassmorphism effects
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🎨 **Smooth Animations**: Fade-in effects, hover animations, and interactive elements
- ✅ **Form Validation**: Real-time validation with error messages
- 📧 **Email Integration**: Automatic email sending to contact@ferdienervida.com
- 🔄 **Progress Indicator**: Visual progress bar showing form completion
- 🎯 **Accessibility**: Keyboard navigation and screen reader friendly
- ⚡ **Performance**: Optimized loading and smooth interactions

## Setup Instructions

### 1. Basic Setup
1. Clone or download the files to your web server
2. Open `index.html` in a web browser to view the form

### 2. Email Configuration

The form is currently configured to send emails to `contact@ferdienervida.com`. To set up email functionality, you have several options:

#### Option A: Formspree (Recommended)
1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form ID
3. Replace `'your-form-id'` in `script.js` line 108 with your actual form ID:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_ACTUAL_FORM_ID', {
   ```

#### Option B: EmailJS
1. Sign up at [EmailJS.com](https://www.emailjs.com)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Replace the `sendEmail` function in `script.js` with EmailJS code:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
       to_email: 'contact@ferdienervida.com',
       from_name: data.firstName + ' ' + data.lastName,
       from_email: data.email,
       message: emailContent
   });
   ```

#### Option C: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to the form tag in `index.html`:
   ```html
   <form id="bookingForm" class="booking-form" netlify>
   ```
3. Netlify will automatically handle form submissions

### 3. Customization

#### Colors and Styling
- Main gradient: Edit the `background` property in `body` selector in `styles.css`
- Button colors: Modify the `.submit-btn` background gradient
- Text colors: Update color values in the CSS variables

#### Form Fields
- Add/remove fields by editing the HTML structure in `index.html`
- Update validation rules in the `validateForm()` function in `script.js`
- Modify required fields array in the JavaScript

#### Animations
- Adjust animation timing in CSS keyframes
- Modify transition durations in the CSS
- Add new animations by creating additional keyframes

## File Structure

```
booking-form-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Features in Detail

### Form Sections
1. **Contact Information**: Name, role, email, phone, message type
2. **Organization Details**: Company/organization name and type
3. **Event Details**: Event information, venue, audience, speakers, budget

### Animations
- Fade-in animations on page load
- Hover effects on buttons and inputs
- Smooth transitions for form interactions
- Loading animations during form submission
- Success modal with bounce-in effect

### Validation
- Required field validation
- Email format validation
- Real-time error display
- Visual feedback for errors

### Mobile Features
- Responsive design for all screen sizes
- Touch-friendly form elements
- Optimized spacing for mobile devices
- Full-width buttons on mobile

## Troubleshooting

### Email Not Sending
1. Check your email service configuration
2. Verify the form ID or API keys are correct
3. Check browser console for error messages
4. Ensure your email service allows the domain

### Form Not Working
1. Check that all files are in the same directory
2. Verify JavaScript is enabled in the browser
3. Check for console errors
4. Ensure all required fields are filled

### Styling Issues
1. Clear browser cache
2. Check CSS file path
3. Verify font loading
4. Test in different browsers

## Deployment

### Static Hosting
- Upload files to any static hosting service (Netlify, Vercel, GitHub Pages)
- No server-side configuration required
- Works with CDN services

### Custom Domain
- Point your domain to the hosting service
- Update any absolute URLs in the code
- Configure SSL certificate

## Support

For technical support or customization requests, contact:
- Email: contact@ferdienervida.com
- Website: [Ferdie Nervida's Website](https://falcon-ellipsoid-t5ag.squarespace.com)

## License

This project is created for Ferdie Nervida's booking form. All rights reserved.

---

**Note**: Remember to replace the email service configuration with your actual setup before deploying to production. 