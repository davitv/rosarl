
import { ManufacturersAction } from './actions';
import * as types from './types';
import * as constants from './constants';

export const manufacturers = (state: types.ManufacturersState = [], action: ManufacturersAction) => {
    switch (action.type) {
        case constants.LOAD_MANUFACTURERS:
            return action.payload;
        default:
            return state;
    }
}

export default manufacturers;