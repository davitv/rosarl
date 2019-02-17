import { Dispatch } from 'redux';

import * as constants from './constants';


export interface SetHeaderCallbackFormSubmitted {
    type: constants.SET_HEADER_CALLBACK_FORM_SUBMITTED;
    payload: {
        submittedBy: string;
        phoneNumber: string;
    };
}

export type UIAction = (
    SetHeaderCallbackFormSubmitted
);

export function setHeaderCallbackFormSubmitted(submittedBy: string, phoneNumber: string) {
    return (dispatch: Dispatch<SetHeaderCallbackFormSubmitted>) => {
        dispatch({
            type: constants.SET_HEADER_CALLBACK_FORM_SUBMITTED,
            payload: {
                submittedBy,
                phoneNumber
            }

        });
    }
}
