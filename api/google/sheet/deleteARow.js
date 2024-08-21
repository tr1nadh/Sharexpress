import {google} from 'googleapis';
import {oAuth2Client} from '../../../utils/g-oAuth-client';
import {createOrUpdateUser, getCredFromCookies} from '../../../utils/user-cookie-manager';
import { kv } from '@vercel/kv';

export default async function deleteRow(cred, rowIndex) {
    oAuth2Client.setCredentials(cred);

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const spreadsheetId = await kv.get(`user:${cred.id}:ds`);
    const response = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId
    })

    const sheetName = 'Form_responses';
    const sheet = response.data.sheets.find(
        (sheetId) => sheetId.properties.title == sheetName
    );

    const sheet_id = sheet.properties.sheetId;

    const request = {
        spreadsheetId: spreadsheetId,
        resource: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId: Number(sheet_id),
                            dimension: 'ROWS',
                            startIndex: Number(rowIndex) - 1,
                            endIndex: Number(rowIndex),
                        },
                    },
                },
            ],
        },
        auth: oAuth2Client,
    }
  
    try {
        const response = await sheets.spreadsheets.batchUpdate(request);
        console.log('Row deleted: ', rowIndex);
    } catch (error) {
      console.error('The API returned an error:', error);
    }
  }