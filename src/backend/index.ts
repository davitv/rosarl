import * as queryString from 'query-string'
import { isArray } from '../utils/check';

export const handleError = (response: Response, errorContent: any) => {
    if (response.status === 400) {
        if (isArray(errorContent)) {
            return {
                ...errorContent[0],
                status: 400
            };
        }
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

export function persistData<T>(apiPath: string, data: Array< Partial<T> >, accessToken: string): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', accessToken);

        fetch(
            apiPath,
            {
                body: JSON.stringify(data),
                method: 'POST',
                headers,
            }
        ).then((response: Response) => {
            if (response.ok) {
                resolve(response.json());
            }
            else if (response.status === 403) {
                reject(handleError(response, 'You have to login to perform this action'));
            }
            else {
                const parseMethod = response.status === 400 ? 'json' : 'text'
                response[parseMethod]().then(errorContent => {
                    reject(handleError(response, errorContent));
                });
            }
        });
    });
}


export const retrieveData = <T>(apiPath: string, accessToken: string) => new Promise<T[]>((resolve, reject) => {
    const headers = new Headers();
    headers.append('Authorization', accessToken);

    fetch(
        apiPath,
        {
            method: 'GET',
            headers,
        }
    ).then((response: Response) => {
        if (response.ok) {
            resolve(response.json());
        }
        else if (response.status === 403) {
            reject(handleError(response, 'You have to login to perform this action'));
        }
        else {
            const parseMethod = response.status === 400 ? 'json' : 'text'
            response[parseMethod]().then(errorContent => {
                reject(handleError(response, errorContent));
            });
        }
    });
});

export const removeData = <T>(apiPath: string, accessToken: string, ids: number[]) => new Promise<void>((resolve, reject) => {
    const headers = new Headers();
    headers.append('Authorization', accessToken);
    const queryParams = '?' +  queryString.stringify({'ids[]': ids});

    fetch(
        apiPath + queryParams,
        {
            method: 'DELETE',
            headers,
        }
    ).then((response: Response) => {
        if (response.ok) {
            resolve();
        }
        else if (response.status === 403) {
            reject(handleError(response, 'You have to login to perform this action'));
        }
        else {
            const parseMethod = response.status === 400 ? 'json' : 'text'
            response[parseMethod]().then(errorContent => {
                reject(handleError(response, errorContent));
            });
        }
    });
});
