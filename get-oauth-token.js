const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

const credentials = require('./client_secret_476448850195-qj33k5nb1d0jone4kbks1e237p75pen4.apps.googleusercontent.com.json');

const { client_id, client_secret } = credentials.web;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  'urn:ietf:wg:oauth:2.0:oob'
);

// Generate auth URL
// NOTE: Gmail SMTP XOAUTH2 requires https://mail.google.com/ scope
// (not https://www.googleapis.com/auth/gmail.send which is for the REST API only)
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://mail.google.com/',
  prompt: 'consent'
});

console.log('Open this URL in your browser:');
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nPaste the authorization code here: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\n✓ Success! Here is your refresh token:');
    console.log('\nREFRESH_TOKEN=' + tokens.refresh_token);
    console.log('\nAdd this to your .env file');
    rl.close();
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
  }
});
