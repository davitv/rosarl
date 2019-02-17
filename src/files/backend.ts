
import { handleError } from '../backend';
import { UserFile } from './types';

export function uploadFile(file: File, accessToken?: string): Promise<UserFile> {
    return new Promise<UserFile>((resolve, reject) => {
        const headers = new Headers();

        if (accessToken !== undefined) {
            headers.append('Authorization', accessToken);
        }
        fetch(
            '/api/file-upload/',
            {
                headers,
                method: 'POST',
                body: file,
            }
        ).then((response: Response) => {
            if (response.ok) {
                response.json().then(resolve);
            } else {
                const parseMethod = response.status === 400 ? 'json' : 'text'
                response[parseMethod]().then(errorContent => {
                    reject(handleError(response, errorContent));
                });
            }
        });
    });
}
