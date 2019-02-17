
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../types';

export const createEntity = (
    <T>(data: Partial<T>, persistFunc: (data: Partial<T>[], token: string) => Promise<T[]>, actionType: string) => (
        createMultipleEntities([data], persistFunc, actionType, false)
    )
);

export function createMultipleEntities<T>(data: Partial<T>[], persistFunc: (data: Partial<T>[], token: string) => Promise<T[]>, actionType: string, optimistic: boolean) {
    return (dispatch: ThunkDispatch<{}, {}, Action>,  getState: () => types.AppState): Promise<T[]> => {
        const token = getState().auth.token;
        if (optimistic) {
            dispatch({
                payload: data,
                type: actionType,
            });
        }
        return persistFunc(data, token).then((res: T[]) => {
            if (!optimistic) {
                dispatch({
                    payload: res,
                    type: actionType,
                });
            }
            return res;
        });
    };
}


export function retrieveData<T>(retrieveFunc: (token: string) => Promise<T[]>, actionType: string) {
    return (dispatch: ThunkDispatch<{}, {}, Action>,  getState: () => types.AppState): Promise<T[]> => {
        const token = getState().auth.token;
        return retrieveFunc(token).then((res: T[]) => {
            dispatch({
                payload: res,
                type: actionType,
            });
            return res;
        });
    };
}


export function removeEntities<T>(removeFunc: (token: string, ids: number[]) => Promise<void>, actionType: string, ids: number[]) {
    return (dispatch: ThunkDispatch<{}, {}, Action>,  getState: () => types.AppState): Promise<void> => {
        const token = getState().auth.token;
        dispatch({
            payload: ids,
            type: actionType,
        });
        return removeFunc(token, ids);
    };
}


export function removeFromStore<T>(payload: any, actionType: string) {
    return (dispatch: ThunkDispatch<{}, {}, Action>,  getState: () => types.AppState): void => {
        dispatch({
            payload,
            type: actionType,
        });
    };
}

