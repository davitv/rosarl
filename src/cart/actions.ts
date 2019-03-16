import { Dispatch } from 'redux';

import { DeliveryData } from './types';

import { retrieveData as backendRetrieve } from '../backend';
import {
    retrieveData,
} from '../actions';

import * as constants from './constants';
import * as types from './types';

export interface IncrementCartItem {
    type: constants.INCREMENT_CART_ITEM;
    payload: number;
}

export interface DecrementCartItem {
    type: constants.DECREMENT_CART_ITEM;
    payload: number;
}


export interface LoadCartProducts {
    type: constants.LOAD_CART_PRODUCTS;
    payload: {
        results: types.CartProduct[];
    };
}

export interface SetCartItemAmount {
    type: constants.SET_CART_ITEM_AMOUNT;
    payload: {
        itemId: number;
        amount: number;
    };
}

export interface SetCartDeliveryFormValidity {
    type: constants.SET_DELIVERY_FORM_VALIDITY;
    payload: boolean;
}

export interface SetCartDeliveryData {
    type: constants.SET_DELIVERY_DATA;
    payload: Partial<DeliveryData>;
}

export type CartAction = (
    IncrementCartItem |
    SetCartDeliveryFormValidity |
    SetCartItemAmount |
    LoadCartProducts |
    SetCartDeliveryData |
    DecrementCartItem
);


export const loadCartProducts = (ids: number[], path='/api/cart/products/') => retrieveData(
    (token: string) => backendRetrieve(path, token, {idx: ids.join(',')}),
    constants.LOAD_CART_PRODUCTS
);


export function setDeliveryFormValidity(isValid: boolean) {
    return (dispatch: Dispatch<SetCartDeliveryFormValidity>) => {
        dispatch({
            type: constants.SET_DELIVERY_FORM_VALIDITY,
            payload: isValid
        });
    }
}

export function setDeliveryFormData(data: Partial<DeliveryData>) {
    return (dispatch: Dispatch<SetCartDeliveryData>) => {
        dispatch({
            type: constants.SET_DELIVERY_DATA,
            payload: data
        });
    }
}

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
