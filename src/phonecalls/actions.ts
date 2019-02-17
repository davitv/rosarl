import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { persistData } from '../backend';

import * as types from '../types';
import * as constants from './constants';

export interface PhoneCallRequestData {
    name: string;
    phone: string;
}

export interface RequestCallAction {
    payload: PhoneCallRequestData[];
    type: constants.REQUEST_PHONE_CALL;
}

export type PhoneCallsAction = RequestCallAction;

export const requestPhoneCall = (data: {name: string; phone: string}) => {
    return (dispatch: ThunkDispatch<{}, {}, Action>,  getState: () => types.AppState): Promise<PhoneCallRequestData> => {
        const token = getState().auth.token;
        return persistData('http://78.155.206.50/api/callback-request/', data, token).then(res => {
            dispatch({
                type: constants.REQUEST_PHONE_CALL,
                payload: res
            });
            return res;
        });
    };
}
