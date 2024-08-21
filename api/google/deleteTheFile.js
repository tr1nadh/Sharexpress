import {getTheRow} from '../../utils/getSheet';
import {createOrUpdateUser, getCredFromCookies} from '../../utils/user-cookie-manager';
import deleteFile from './drive/deleteFileById';
import deleteRow from './sheet/deleteARow';

export default async function(req, res) {
    const { id } = req.query;
    const cred = getCredFromCookies(req);
    if (!cred.refresh_token) {
        res.redirect(process.env.DOMAIN + '/action/login');
        return;
    }

    // index + 1 = sheet row (0 + 1 = sheet row 1)
    const sheetRow = Number(id) + 1;
    console.log('Sheet row', sheetRow);
    const sheet = await getTheRow(cred, sheetRow);
    const links = sheet[2].split(',');
    const regex = /id=([a-zA-Z0-9_-]+)/;
    links.forEach(link => {
        const linkId = link.match(regex)[1];
        deleteFile(cred, linkId);
        console.log('Linkid: ', linkId);
    });
    await deleteRow(cred, sheetRow);

    res.send('Done');

    if (!cred.access_token) {
        const tokens = oAuth2Client.credentials;
        createOrUpdateUser(cred.id, res, tokens);
    }
}