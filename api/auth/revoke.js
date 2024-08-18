import {getCredFromCookies, clearCredCookies} from '../../utils/user-cookie-manager';

export default async function(req, res) {
    const cred = getCredFromCookies(req);
    const url = `https://oauth2.googleapis.com/revoke?token=${cred.refresh_token}`;
    try {
        const response = await fetch(url, { method: 'POST' });
        if (response.ok) {
            console.log('Token revoked successfully');
        } else {
            console.error('Failed to revoke token:', response.statusText);
        }
    } catch (error) {
        console.error('Error revoking token:', error);
    }

    clearCredCookies(res);
    res.send({url: process.env.DOMAIN});
    console.log(process.env.DOMAIN);
}