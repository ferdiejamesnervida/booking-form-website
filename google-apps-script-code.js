// Google Apps Script Code
// Copy this entire code into your Google Apps Script editor
// Then deploy as a web app

function doPost(e) {
  try {
    // Handle CORS preflight requests
    if (e.parameter.method === 'OPTIONS') {
      return ContentService
        .createTextOutput('')
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (replace with your sheet ID if needed)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // If this is the first submission, add headers
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'First Name',
        'Last Name', 
        'Role',
        'Email',
        'Phone',
        'Message Type',
        'Organization',
        'Organization Type',
        'Event Title',
        'Event Date',
        'Event Time',
        'Venue',
        'Venue Type',
        'Audience Type',
        'Attendees',
        'Other Speakers',
        'Suggested Topic',
        'Speaking Duration',
        'Budget',
        'Other Instructions'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.role || '',
      data.email || '',
      data.phone || '',
      data.messageType || '',
      data.organization || '',
      data.orgType || '',
      data.eventTitle || '',
      data.eventDate || '',
      data.eventTime || '',
      data.venue || '',
      data.venueType || '',
      data.audienceType || '',
      data.attendees || '',
      data.otherSpeakers || '',
      data.suggestedTopic || '',
      data.speakingDuration || '',
      data.budget || '',
      data.otherInstructions || ''
    ];
    
    // Add the new row
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// Optional: Email notification function
function sendEmailNotification(data) {
  const recipient = 'contact@ferdienervida.com'; // Replace with your email
  const subject = `New Booking Request from ${data.firstName} ${data.lastName}`;
  
  const message = `
New booking request received:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Organization: ${data.organization || 'Not specified'}
Event: ${data.eventTitle || 'Not specified'}
Date: ${data.eventDate || 'Not specified'}
Venue: ${data.venue || 'Not specified'}

View full details in your Google Sheet.
  `;
  
  MailApp.sendEmail(recipient, subject, message);
}

// Test function to verify the script works
function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script is working!')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Test email function - run this manually to test email sending
function testEmail() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    organization: 'Test Organization',
    eventTitle: 'Test Event',
    eventDate: '2024-01-01',
    venue: 'Test Venue'
  };
  
  try {
    sendEmailNotification(testData);
    Logger.log('Test email sent successfully!');
  } catch (error) {
    Logger.log('Error sending test email: ' + error.toString());
  }
} 