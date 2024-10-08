import {getCredFromCookies, clearCredCookies} from '../../utils/user-cookie-manager';
import {oAuth2Client} from '../../utils/g-oAuth-client';

export default async function(req, res) {
    const cred = getCredFromCookies(req);
    clearCredCookies(res);
    try {
        await oAuth2Client.revokeToken(cred.refresh_token);
        console.log('Token revoked successfully');
        res.send({url: process.env.DOMAIN});
    } catch (error) {
        console.error('Error revoking token:', error);
    }
}