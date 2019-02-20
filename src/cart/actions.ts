import { Dispatch } from 'redux';

import * as constants from './constants';
import * as types from '../types';

export interface IncrementCartItem {
    type: constants.INCREMENT_CART_ITEM;
    payload: number;
}

export interface DecrementCartItem {
    type: constants.DECREMENT_CART_ITEM;
    payload: number;
}

export interface SetCartItemAmount {
    type: constants.SET_CART_ITEM_AMOUNT;
    payload: {
        itemId: number;
        amount: number;
    };
}

export type CartAction = (
    IncrementCartItem |
    SetCartItemAmount |
    DecrementCartItem
);

export function increment(itemId: number) {
    return (dispatch: Dispatch<IncrementCartItem>) => {
        dispatch({
            type: constants.INCREMENT_CART_ITEM,
            payload: itemId
        });
    }
}

export function decrement(itemId: number) {
    return (dispatch: Dispatch<DecrementCartItem>) => {
        dispatch({
            type: constants.DECREMENT_CART_ITEM,
            payload: itemId
        });
    }
}

export function setAmount(itemId: number, amount: number) {
    return (dispatch: Dispatch<SetCartItemAmount>) => {
        dispatch({
            type: constants.SET_CART_ITEM_AMOUNT,
            payload: {
                itemId,
                amount,
            }
        });
    }
}
