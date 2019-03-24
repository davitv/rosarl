import { Dispatch } from 'redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../types';
import { persistData, retrieveData as backendRetrieve } from '../backend';
import {
    retrieveData,
} from '../actions';

import * as constants from './constants';
import * as types from './types';
import { DeliveryData, OrderData } from './types';

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

export interface SetCartOrderData {
    type: constants.SET_ORDER_DATA;
    payload: Partial<OrderData>;
}

export type CartAction = (
    IncrementCartItem |
    SetCartDeliveryFormValidity |
    SetCartItemAmount |
    LoadCartProducts |
    SetCartOrderData |
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

export function setOrderData(data: Partial<OrderData>) {
    return (dispatch: Dispatch<SetCartOrderData>) => {
        dispatch({
            type: constants.SET_ORDER_DATA,
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

export const submitOrder = (data: Partial<types.OrderData>) => {
    return (dispatch: ThunkDispatch<{}, {}, Action>,  getState: () => AppState): Promise<types.OrderData> => {
        const token = getState().auth.token;
        return persistData('/api/orders/', data, token).then(res => {
            dispatch({
                type: constants.SUBMIT_ORDER,
                payload: res
            });
            return res;
        });
    };
}