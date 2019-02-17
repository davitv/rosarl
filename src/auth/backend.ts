
export const handleError = (response: Response, errorContent: string | {[key: string]: string}) => {
    if (response.status === 400) {
        return {
            ...errorContent as {[key: string]: string},
            status: 400
        };
    }
    if (response.status === 500) {
        return {
            '_error': 'Server is temporary unavailable. Please, try again later.',
            status: 500
        };
    }
    return {
        '_error': errorContent,
        'status': response.status,
    }
}


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

export function resetPassword(email: string) {
    return new Promise<any>((resolve, reject) => {
        fetch(
            '/api/auth/reset-password/',
            {
                body: JSON.stringify({email}),
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


export function createNewPassword(password: string, uid: string, token: string) {
    return new Promise<any>((resolve, reject) => {
        fetch(
            '/api/auth/create-new-password/',
            {
                body: JSON.stringify({password, uid, token}),
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