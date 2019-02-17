import { Dispatch } from 'redux';

import * as constants from './constants';


export interface SetHeaderCallbackFormSubmitted {
    type: constants.SET_HEADER_CALLBACK_FORM_SUBMITTED;
    payload: {
        submittedBy: string;
        phoneNumber: string;
    };
}

export interface SelectCategory {
    type: constants.SELECT_CATEGORY;
    payload: number;
}

export interface ToggleCategory {
    type: constants.TOGGLE_CATEGORY;
    payload: number;
}

export type UIAction = (
    SetHeaderCallbackFormSubmitted |
    ToggleCategory |
    SelectCategory
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

export function selectCategory(categoryId: number) {
    return (dispatch: Dispatch<SelectCategory>) => {
        dispatch({
            type: constants.SELECT_CATEGORY,
            payload: categoryId,
        });
    }
}

export function toggleCategory(categoryId: number) {
    return (dispatch: Dispatch<ToggleCategory>) => {
        dispatch({
            type: constants.TOGGLE_CATEGORY,
            payload: categoryId,
        });
    }
}
