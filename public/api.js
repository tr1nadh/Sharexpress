
export async function deleteFile(fileId) {
    fetch('api/google/deleteTheFile?id=' + fileId)
    .then(response => {
        if (!response.ok) {
            console.log('Some error when deleting the file');
        }
    }).catch(error => {
        console.log('Error: ', error);
    });
}

export async function getQR() {
    return fetch('api/generateQR')
    .then(response => {
        if (!response.ok) {
            console.log('some error when generating qr');
        }
        return response.json();
    }).catch(error => {
        console.log('Error: ', error);
    });
}

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

export async function revokeUser() {
    return fetch('api/auth/revoke')
    .then(response => {
        if (!response.ok) {
            console.log('Cannot revoke user');
        }
        return response.json();
    }).catch(error => {
        console.log('Error: ', error);
    });
}