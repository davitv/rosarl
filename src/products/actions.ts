import { retrieveData as backendRetrieve } from '../backend';
import {
    retrieveData,
} from '../actions';
import * as constants from './constants';
import { Product } from './types';

export interface QueryParams {
    category: number;
    q: string;
}

export interface LoadProducts {
    type: constants.LOAD_PRODUCTS;
    payload: {
        results: Product[];
    };
}

export type ProductsAction = (
    LoadProducts
);

export const loadProducts = (queryParams?: Partial<QueryParams>) => retrieveData(
    (token: string) => backendRetrieve('http://78.155.206.50/api/products/', token, queryParams),
    constants.LOAD_PRODUCTS
);
