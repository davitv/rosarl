
import * as types from './types';
import * as constants from './constants';

import { UIAction } from './actions';

const getDefaultState = (): types.UIState => ({
    isHeaderCallbackFormSubmitted: false,
    headerCallbackFormSubmittedBy: '',
    headerCallbackFormSubmittedPhone: '',
});

export const reducer = (state: types.UIState = getDefaultState(), action: UIAction) => {
    switch (action.type) {
        case constants.SET_HEADER_CALLBACK_FORM_SUBMITTED:
            return {
                ...state,
                isHeaderCallbackFormSubmitted: true,
                headerCallbackFormSubmittedBy: action.payload.submittedBy,
                headerCallbackFormSubmittedPhone: action.payload.phoneNumber
            }
        default:
            return state;
    }
}

export default reducer;