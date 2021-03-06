
import { addOrRemove } from '../utils/fp';

import * as types from './types';
import * as constants from './constants';

import { UIAction } from './actions';


const getDefaultState = (): types.UIState => ({
    isHeaderCallbackFormSubmitted: false,
    isCartOpen: false,
    cartState: types.CartState.productsList,
    headerCallbackFormSubmittedBy: '',
    headerCallbackFormSubmittedPhone: '',
    selectedCategory: 0,
    isFilteringOpen: false,
    openCategories: [],
    openProducts: [],
    companyInfo: {
        about: '',
        contacts: {
            address: '',
            managers: [],
            route: '',
            routeScheme: '',
            textAfter: '',
            textBefore: '',
            warehouseAddress: '',
        },
        payment: {
            image_url: '',
            text: '',
        }
    }
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
        case constants.LOAD_COMPANY_INFO:
            return {
                ...state,
                companyInfo: action.payload
            };
        case constants.TOGGLE_FILTERS:
            return {
                ...state,
                isFilteringOpen: action.payload
            };
        case constants.SET_CART:
            return {
                ...state,
                cartState: action.payload
            };
        case constants.TOGGLE_PRODUCT:
            return {
                ...state,
                openProducts: addOrRemove(state.openProducts, action.payload)
            };
        case constants.SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            };
        case constants.TOGGLE_CART:
            return {
                ...state,
                isCartOpen: action.payload
            };
        default:
            return state;
    }
}

export default reducer;