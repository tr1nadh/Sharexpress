import {google} from 'googleapis';
import {oAuth2Client} from '../../utils/g-oAuth-client';
import {createOrUpdateUser} from '../../utils/user-cookie-manager';
import cookie from 'cookie';

export default async function getFileById(req, res) {
    const { fileId } = req.query;
    const cred = getCredFromCookies(req);
    if (!cred.refresh_token) {
        res.redirect('/action/login');
        return;
    }

    oAuth2Client.setCredentials(cred);
    const drive = google.drive({version: 'v3', auth: oAuth2Client});
    try {
        const response = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink'
        })

        console.log("File info: ", response.data);
        let link = 'https://drive.google.com/uc?export=view&id=' + fileId;
        let newLink = `https://drive.usercontent.google.com/download?id=${fileId}&export=view&authuser=0`;
        res.send({webLink: newLink});
    } catch (error) {
        console.error('Error fetching files: ', error)
    }

    if (!cred.access_token) {
        const tokens = oAuth2Client.credentials;
        createOrUpdateUser(res, tokens);
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

