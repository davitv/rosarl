
import { addOrRemove } from '../utils/fp';

import * as types from './types';
import * as constants from './constants';

import { UIAction } from './actions';


const getDefaultState = (): types.UIState => ({
    isHeaderCallbackFormSubmitted: false,
    headerCallbackFormSubmittedBy: '',
    headerCallbackFormSubmittedPhone: '',
    selectedCategory: 0,
    openCategories: []
});

export const reducer = (state: types.UIState = getDefaultState(), action: UIAction) => {
    switch (action.type) {
        case constants.SET_HEADER_CALLBACK_FORM_SUBMITTED:
            return {
                ...state,
                isHeaderCallbackFormSubmitted: true,
                headerCallbackFormSubmittedBy: action.payload.submittedBy,
                headerCallbackFormSubmittedPhone: action.payload.phoneNumber
            };
        case constants.TOGGLE_CATEGORY:
            return {
                ...state,
                openCategories: addOrRemove(state.openCategories, action.payload)
            };
        case constants.SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            };
        default:
            return state;
    }
}

export default reducer;