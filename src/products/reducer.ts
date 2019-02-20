import { updateStorageItems } from '../utils/fp';

import * as types from './types';
import * as constants from './constants';

import { ProductsAction } from './actions';

const getDefaultState = (): types.ProductsState => ({
    products: [],
    filteringAttributes: []
});

export const reducer = (state: types.ProductsState = getDefaultState(), action: ProductsAction) => {
    switch (action.type) {
        case constants.LOAD_PRODUCTS:
            return {
                ...state,
                products: updateStorageItems(state.products, action.payload.results, 'product_id')
            };
        case constants.RESET_PRODUCTS:
            return {
                ...state,
                products: []
            };
        case constants.LOAD_FILTERING_ATTRIBUTES:
            return {
                ...state,
                filteringAttributes: action.payload.results
            };
        default:
            return state;
    }
}

export default reducer;