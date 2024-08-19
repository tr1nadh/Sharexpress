import QRCode from 'qrcode';
import {getCredFromCookies} from '../utils/user-cookie-manager';
import { kv } from '@vercel/kv';

export default async function(req, res) {
    const cred = getCredFromCookies(req);
    if (!cred.refresh_token) {
        res.redirect(process.env.DOMAIN + '/action/login');
        return;
    }
    const fQRUrl = await kv.get(`user:${cred.id}:f-qr-url`);
    const fUrlChange = await kv.get(`user:${cred.id}:f-url-change`);
    if (fQRUrl && !fUrlChange) {
        res.send({qrUrl: fQRUrl});
        return;
    }

    const url = await kv.get(`user:${cred.id}:furl`);
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    await kv.set(`user:${cred.id}:f-qr-url`, qrCodeDataUrl);
    await kv.set(`user:${cred.id}:f-url-change`, 'false');
    res.send({qrUrl: qrCodeDataUrl});
}