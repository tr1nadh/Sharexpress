import {getCookieExpireTime} from './date-and-time-utils';
import cookie from 'cookie';

export function createOrUpdateUser(id, res, tokens) {
  const cookieExpireTime = getCookieExpireTime(tokens.expiry_date);
  const maxAge_30Days = (30 * 24 * 60 * 60 * 1000);
  const isSecure = process.env.NODE_ENV === 'prod' ? 'Secure;' : '';
  res.setHeader('Set-Cookie', [
    `id=${id}; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=${maxAge_30Days}`,
    `access_token=${tokens.access_token}; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=${cookieExpireTime}`,
    `refresh_token=${tokens.refresh_token}; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=${maxAge_30Days}`,
    `expiry_date=${tokens.expiry_date}; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=${maxAge_30Days}`,
  ]);
}

export function clearCredCookies(res) {
  const isSecure = process.env.NODE_ENV === 'prod' ? 'Secure;' : '';
  res.setHeader('Set-Cookie', [
      `id=0; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=0`,
      `access_token=0; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=0`,
      `refresh_token=0; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=0`,
      `expiry_date=0; HttpOnly; ${isSecure}; SameSite=Strict; Path=/; Max-Age=0`,
    ]);
}

export function getCredFromCookies(req) {
  const parsedCookies = cookie.parse(req.headers.cookie || '');
  return {
    id: parsedCookies.id,
    access_token: parsedCookies.access_token,
    refresh_token: parsedCookies.refresh_token,
    token_type: 'Bearer',
    expiry_date: parsedCookies.expiry_date
  }
}