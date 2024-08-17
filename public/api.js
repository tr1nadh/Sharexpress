export async function getLoginUrl() {
    return fetch('api/auth/url')
    .then(response => {
        if (!response.ok) {
            console.log('Cannot login some response error');
        }
        return response.json();
    }).catch(error => {
        console.log('Error: ', error);
    });
}