import { retrieveData as backendRetrieve } from '../backend';
import {
    retrieveData,
} from '../actions';
import * as constants from './constants';

export interface QueryParams {
    category: string;
    q: string;
}


export interface SearchProducts {
    type: constants.LOAD_PRODUCTS;
    payload: any[];
}

export type ProductsAction = (
    SearchProducts
);

export const loadProducts = (queryParams?: Partial<QueryParams>) => retrieveData(
    (token: string) => backendRetrieve('/api/products/', token, queryParams),
    constants.LOAD_PRODUCTS
);
