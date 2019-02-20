
import { clone } from '../utils/fp';

import * as types from './types';
import * as constants from './constants';

import { CartAction } from './actions';


const getDefaultState = (): types.CartState => ({
    selectedItems: {},
});

export const reducer = (state: types.CartState = getDefaultState(), action: CartAction) => {
    switch (action.type) {
        case constants.INCREMENT_CART_ITEM:
            const clonedItems = clone(state.selectedItems);

            if (clonedItems[action.payload] !== undefined) {
                clonedItems[action.payload] = clonedItems[action.payload] + 1;
            } else {
                clonedItems[action.payload] = 1;
            }

            return {
                ...state,
                selectedItems: clonedItems
            };
        case constants.DECREMENT_CART_ITEM:
            const clonedItemsDecr = clone(state.selectedItems);

            if (clonedItemsDecr[action.payload] !== undefined) {
                clonedItemsDecr[action.payload] = clonedItemsDecr[action.payload] - 1;
            }

            if (clonedItemsDecr[action.payload] === 0) {
                delete clonedItemsDecr[action.payload];
            }

            return {
                ...state,
                selectedItems: clonedItemsDecr
            };
        case constants.SET_CART_ITEM_AMOUNT:
            const clonedItemsSet = clone(state.selectedItems);

            clonedItemsSet[action.payload.itemId] = action.payload.amount;

            if (clonedItemsSet[action.payload.itemId] === 0) {
                delete clonedItemsSet[action.payload.itemId];
            }
            return {
                ...state,
                selectedItems: clonedItemsSet
            };
        default:
            return state;
    }
}

export default reducer;