import {google} from 'googleapis';
import {oAuth2Client} from '../../../utils/g-oAuth-client';
import {createOrUpdateUser} from '../../../utils/user-cookie-manager';

export default async function deleteFile(cred, fileId) {
    oAuth2Client.setCredentials(cred);
    const drive = google.drive({version: 'v3', auth: oAuth2Client});
    try {
        const response = await drive.files.delete({
            fileId: fileId,
        })

        console.log(`File ${fileId} deleted`);
    } catch (error) {
        console.error('Error fetching files: ', error)
    }
}

