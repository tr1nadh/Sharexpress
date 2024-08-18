import {getCredFromCookies} from '../../utils/user-cookie-manager';

export default function(req, res) {
    const cred = getCredFromCookies(req);
    if (cred.refresh_token) {
        res.redirect(process.env.DOMAIN + '/files');
        return;
    }
    
    res.redirect(process.env.DOMAIN + '/signup');
}