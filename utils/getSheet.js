import {google} from 'googleapis';
import {oAuth2Client} from './g-oAuth-client';
import { kv } from '@vercel/kv';

export async function getTheRow(cred, rowIndex) {
    oAuth2Client.setCredentials(cred);

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const spreadsheetId = await kv.get(`user:${cred.id}:ds`);
    const range = `Form_responses!${rowIndex}:${rowIndex}`; // Fetch columns A and B from the sheet
  
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const rows = response.data.values;
      if (rows.length) {
        return rows[0];
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error('The API returned an error:', error);
    }

  }