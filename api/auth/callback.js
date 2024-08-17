import {oAuth2Client} from '../../utils/g-oAuth-client';
import {createOrUpdateUser} from '../../utils/user-cookie-manager';

export default async function(req, res) {
    const code = req.query.code;
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        createOrUpdateUser(res, tokens);
        res.redirect('/files');
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};