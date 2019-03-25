import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { persistData, retrieveData } from '../backend';

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


export const login = (data: {username: string; password: string}) => {
    return (dispatch: ThunkDispatch<{}, {}, ISetAuthCredentials>,  getState: () => any): Promise<ISetAuthCredentials> => {
        const token = getState().auth.token;
        return persistData('/api/login/', data, token).then((res: any) => {
            dispatch({
                type: constants.SET_AUTH_CREDENTIALS,
                payload: res
            });
            return res;
        });
    };
}


export const getUserDetails = () => {
    return (dispatch: ThunkDispatch<{}, {}, any>,  getState: () => any): Promise<any> => {
        const token = getState().auth.token;
        return retrieveData('/api/user-info/', token).then((res: any) => {
            dispatch({
                type: constants.SET_AUTH_CREDENTIALS,
                payload: res
            });
            return res;
        });
    };
}
