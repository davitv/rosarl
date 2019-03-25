import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { persistData, retrieveData } from '../backend';

import * as constants from './constants';
import * as types from './types';

export interface SetUserDetails {
    type: constants.SET_USER_DETAILS;
    payload: any;
}

export type AccountAction = SetUserDetails;


export const getUserDetails = () => {
    return (dispatch: ThunkDispatch<{}, {}, any>,  getState: () => any): Promise<any> => {
        const token = getState().auth.token;
        return retrieveData('/api/user-info/', token).then((res: any) => {
            dispatch({
                type: constants.SET_USER_DETAILS,
                payload: res
            });
            return res;
        });
    };
}
