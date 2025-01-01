import { google } from 'googleapis';

const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
  keyFile: './google.json',
  scopes,
});

export const sheets = google.sheets({ version: 'v4', auth });

export const spreadsheetId = process.env.SPREADSHEET_ID;