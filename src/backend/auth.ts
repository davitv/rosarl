import { handleError } from './index';

export function getAuthCredentials(username: string, password: string) {
    return new Promise<any>((resolve, reject) => {
        fetch(
            '/api/auth/login/',
            {
                body: JSON.stringify({username, password}),
                method: 'POST',
            }
        ).then((response: Response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                const parseMethod = response.status === 400 ? 'json' : 'text'
                response[parseMethod]().then(errorContent => {
                    reject(handleError(response, errorContent));
                });
            }
        });
    })
}

export function createAccount(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
        fetch(
            '/api/auth/signup/',
            {
                body: JSON.stringify({email, password}),
                method: 'POST',
            }
        ).then((response: Response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                const parseMethod = response.status === 400 ? 'json' : 'text'
                response[parseMethod]().then(errorContent => {
                    reject(handleError(response, errorContent));
                });
            }
        });
    })
}
