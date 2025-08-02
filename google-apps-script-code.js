// Google Apps Script for Booking Form
// Deploy as web app with "Anyone" access

function doPost(e) {
  try {
    Logger.log('doPost function called');
    
    // Parse the incoming data
    let data = {};
    if (e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else {
      // Handle form data
      const params = e.parameter;
      Object.keys(params).forEach(key => {
        data[key] = params[key];
      });
    }
    
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Get the spreadsheet by ID
    const spreadsheetId = '1c5VnVwRH7iCwzhRQuVNtYQ6T1dMqaLx8mg-aoHUiE5I';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    Logger.log('Spreadsheet opened: ' + spreadsheet.getName());
    
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
      Logger.log('Headers added');
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
    Logger.log('Data added to row: ' + nextRow);
    
    // Send email notification
    try {
      sendEmailNotification(data);
      Logger.log('Email sent successfully');
    } catch (emailError) {
      Logger.log('Email error: ' + emailError.toString());
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Email notification function
function sendEmailNotification(data) {
  const recipient = 'contact@ferdienervida.com';
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

// Test function
function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test email function
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