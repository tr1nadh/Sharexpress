import {get30DaysExpireTime, getCookieExpireTime} from './date-and-time-utils';
import cookie from 'cookie';

export function createOrUpdateUser(res, tokens) {
    const cookieExpireTime = getCookieExpireTime(tokens.expiry_date);
    const th30DaysExpireTime = get30DaysExpireTime();
    res.setHeader('Set-Cookie', [
        `access_token=${tokens.access_token}; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=${cookieExpireTime}`,
        `refresh_token=${tokens.refresh_token}; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=${th30DaysExpireTime}`,
        `expiry_date=${tokens.expiry_date}; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=${th30DaysExpireTime}`,
      ]);
}

export function clearCredCookies(res) {
  res.setHeader('Set-Cookie', [
      `access_token=0; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=0`,
      `refresh_token=0; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=0`,
      `expiry_date=0; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=0`,
    ]);
}

export function getCredFromCookies(req) {
  const parsedCookies = cookie.parse(req.headers.cookie || '');
  return {
      access_token: parsedCookies.access_token,
      refresh_token: parsedCookies.refresh_token,
      token_type: 'Bearer',
      expiry_date: parsedCookies.expiry_date
  }
}