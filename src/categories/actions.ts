import { retrieveData as backendRetrieve } from '../backend';
import {
    retrieveData,
} from '../actions';
import * as constants from './constants';
import * as types from './types';

export interface LoadCategories {
    type: constants.LOAD_CATEGORIES;
    payload: {
        count: number;
        results: types.Category[];
    };
}

export type CategoriesAction = (
    LoadCategories
);

export const loadCategories = () => retrieveData(
    (token: string) => backendRetrieve('http://78.155.206.50/api/categories/', token),
    constants.LOAD_CATEGORIES
);
