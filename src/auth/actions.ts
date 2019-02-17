import { Dispatch } from 'redux';

import * as constants from './constants';
import * as types from './types';

export interface ISetAuthCredentials {
    type: constants.SET_AUTH_CREDENTIALS;
    payload: types.IAuth;
}

export interface ILogout {
    type: constants.LOG_OUT;
}

export type AuthAction = ISetAuthCredentials | ILogout;

export function authenticate(authCredentials: types.IAuth) {
    return (dispatch: Dispatch<ISetAuthCredentials>) => {
        dispatch({
            payload: authCredentials,
            type: constants.SET_AUTH_CREDENTIALS,
        });
    };
}

export function logout() {
    return (dispatch: Dispatch<ILogout>) => {
        dispatch({
            type: constants.LOG_OUT,
        });
    };
}
