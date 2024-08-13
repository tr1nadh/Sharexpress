import * as api from './api.js';

document.getElementById('login-btn').addEventListener('click', async () => {
    window.location.href = await api.getLoginUrl().url;
})