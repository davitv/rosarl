
import * as types from './types';
import * as constants from './constants';

import { CategoriesAction } from './actions';

const getDefaultState = (): types.CategoriesState => [];

export const reducer = (state: types.CategoriesState = getDefaultState(), action: CategoriesAction) => {
    switch (action.type) {
        case constants.LOAD_CATEGORIES:
            return action.payload.results;
        default:
            return state;
    }
}

export default reducer;