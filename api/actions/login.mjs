import fetch from 'node-fetch';

export default async function login(req, res) {
    const authUrl =  await fetch(process.env.DOMAIN + '/api/auth/url')
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).catch(error => {console.error(error)});

    res.redirect(authUrl.url);
}