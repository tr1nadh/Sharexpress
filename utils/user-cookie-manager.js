import {get30DaysExpireTime, getCookieExpireTime} from './date-and-time-utils';

export function createOrUpdateUser(res, tokens) {
    const cookieExpireTime = getCookieExpireTime(tokens.expiry_date);
    const th30DaysExpireTime = get30DaysExpireTime();
    res.setHeader('Set-Cookie', [
        `access_token=${tokens.access_token}; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=${cookieExpireTime}`,
        `refresh_token=${tokens.refresh_token}; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=${th30DaysExpireTime}`,
        `expiry_date=${tokens.expiry_date}; HttpOnly; false; SameSite=Strict; Path=/; Max-Age=${th30DaysExpireTime}`,
      ]);
}