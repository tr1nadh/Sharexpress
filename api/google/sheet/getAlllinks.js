import {google} from 'googleapis';
import {oAuth2Client} from '../../../utils/g-oAuth-client';
import cookie from 'cookie';

export default async function getTwoColumns(req, res) {
    const cred = getCredFromCookies(req);
    if (!cred.refresh_token) {
        res.redirect('/action/login');
        return;
    }
    oAuth2Client.setCredentials(cred);

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const spreadsheetId = process.env.LINKS_SHEET_ID;
    const range = 'Form_responses!B:C'; // Fetch columns A and B from the sheet
  
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const rows = response.data.values;
      if (rows.length) {
        const valuesData = {};
        rows.forEach(row => {
          const name = row[0];
          const links = row[1];
          // console.log(`Column B: ${name}, Column C: ${links}`);
          valuesData[name] = links;
        });
        res.send(valuesData);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error('The API returned an error:', error);
    }

  }

  function getCredFromCookies(req) {
    const parsedCookies = cookie.parse(req.headers.cookie || '');
    return {
        access_token: parsedCookies.access_token,
        refresh_token: parsedCookies.refresh_token,
        token_type: 'Bearer',
        expiry_date: parsedCookies.expiry_date
    }
}