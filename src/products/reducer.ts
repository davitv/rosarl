
import * as types from './types';
import * as constants from './constants';

import { ProductsAction } from './actions';

const getDefaultState = (): types.ProductsState => ({
    products: []
});

export const reducer = (state: types.ProductsState = getDefaultState(), action: ProductsAction) => {
    switch (action.type) {
        case constants.LOAD_PRODUCTS:
            return {
                ...state,
                products: action.payload.results
            };
        default:
            return state;
    }
}

export default reducer;