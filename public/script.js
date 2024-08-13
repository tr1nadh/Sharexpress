import * as api from './api.js';

document.getElementById('login-btn').addEventListener('click', async () => {
    let loginUrl = await api.getLoginUrl();
    window.location.href = loginUrl.url;
})