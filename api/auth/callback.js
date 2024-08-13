import {OAuth2Client} from 'google-auth-library'; 

const CLIENT_ID = '747178828000-rd118ek1tcsuuk0tfa84np1f0thtb2he.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const callback = async (req, res) => {
    const code = req.query.code;
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        res.send('true');
    } catch (error) {
        console.error(error);
        res.send('false');
    }
};