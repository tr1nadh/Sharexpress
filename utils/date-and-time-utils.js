
export function get30DaysExpireTime() {
    const expiresIn30Days = new Date();
    expiresIn30Days.setDate(expiresIn30Days.getDate() + 30);
    return expiresIn30Days;
}

export function getCookieExpireTime(oAuthExpireTime) {
    return new Date(oAuthExpireTime * 1000);
}