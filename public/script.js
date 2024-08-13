import * as api from './api.js';

document.getElementById('login-btn').addEventListener(async event => {
    window.location.href = await api.getLoginUrl().authUrl;
})