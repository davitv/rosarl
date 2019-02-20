import { Dispatch } from 'redux';
import { retrieveData as backendRetrieve } from '../backend';
import {
    retrieveData,
} from '../actions';
import * as constants from './constants';
import { Product, FilteringAttribute } from './types';

export interface QueryParams {
    category: number;
    attributes: string;
    q: string;
}

export interface LoadProducts {
    type: constants.LOAD_PRODUCTS;
    payload: {
        results: Product[];
    };
}

export interface ResetProducts {
    type: constants.RESET_PRODUCTS;
}

export interface LoadFilteringAttributes {
    type: constants.LOAD_FILTERING_ATTRIBUTES;
    payload: {
        results: FilteringAttribute[];
    };
}

export type ProductsAction = (
    LoadProducts |
    ResetProducts |
    LoadFilteringAttributes
);

export const loadProducts = (queryParams?: Partial<QueryParams>, path='/api/products/') => retrieveData(
    (token: string) => backendRetrieve(path, token, queryParams),
    constants.LOAD_PRODUCTS
);

export const loadFilteringAttributes = (categoryId: number) => retrieveData(
    (token: string) => backendRetrieve('/api/attributes/', token, {category_id: categoryId}),
    constants.LOAD_FILTERING_ATTRIBUTES
);

export function resetProducts() {
    return (dispatch: Dispatch<ResetProducts>) => {
        dispatch({
            type: constants.RESET_PRODUCTS
        });
    }
}