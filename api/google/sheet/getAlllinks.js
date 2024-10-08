import {google} from 'googleapis';
import {oAuth2Client} from '../../../utils/g-oAuth-client';
import {createOrUpdateUser, getCredFromCookies} from '../../../utils/user-cookie-manager';
import { kv } from '@vercel/kv';

export default async function getTwoColumns(req, res) {
    const cred = getCredFromCookies(req);
    if (!cred.refresh_token) {
        res.redirect(process.env.DOMAIN + '/action/login');
        return;
    }
    oAuth2Client.setCredentials(cred);

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const spreadsheetId = await kv.get(`user:${cred.id}:ds`);
    const range = 'Form_responses!B:C'; // Fetch columns A and B from the sheet
  
    const valuesData = {};
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const rows = response.data.values;
      if (rows.length) {
        rows.forEach((row, index) => {
          if (index === 0) return;
          const name = row[0];
          const links = row[1];
          // console.log(`Column B: ${name}, Column C: ${links}`);
          valuesData[name] = links;
        });
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error('The API returned an error:', error);
    }

    if (!cred.access_token) {
      const tokens = oAuth2Client.credentials;
      createOrUpdateUser(cred.id, res, tokens);
    }
    res.send(valuesData);
  }