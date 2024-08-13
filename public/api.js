async function getLoginUrl() {
    return fetch('api/auth/login')
    .then(response => {
        if (!response.ok) {
            console.log('Cannot login some response error');
        }
        return response.json();
    }).catch(error => {
        console.log('Error: ', error);
    });
}