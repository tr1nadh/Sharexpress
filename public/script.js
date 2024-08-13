import * as api from './api';

document.getElementById('login-btn').addEventListener(async event => {
    window.location.href = await api.getLoginUrl().authUrl;
})