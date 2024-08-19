import {oAuth2Client} from '../../utils/g-oAuth-client';
import {google} from 'googleapis';
import {createOrUpdateUser} from '../../utils/user-cookie-manager';

export default async function(req, res) {
    const code = req.query.code;
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
        const { data } = await oauth2.userinfo.get();
        createOrUpdateUser(data.email, res, tokens);
        res.redirect('/files');
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};