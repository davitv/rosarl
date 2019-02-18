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

export interface LoadFilteringAttributes {
    type: constants.LOAD_FILTERING_ATTRIBUTES;
    payload: {
        results: FilteringAttribute[];
    };
}

export type ProductsAction = (
    LoadProducts |
    LoadFilteringAttributes
);

export const loadProducts = (queryParams?: Partial<QueryParams>, path='/api/products/') => retrieveData(
    (token: string) => backendRetrieve(path, token, queryParams),
    constants.LOAD_PRODUCTS
);

export const loadFilteringAttributes = (categoryId: number) => retrieveData(
    (token: string) => backendRetrieve('http://78.155.206.50/api/attributes/', token, {category_id: categoryId}),
    constants.LOAD_FILTERING_ATTRIBUTES
);
