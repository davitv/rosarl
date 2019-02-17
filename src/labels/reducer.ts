
import { updateStorageItems } from '../utils/fp';

import { LabelsAction } from './actions';
import * as constants from './constants';
import * as types from './types';

const getDefaultState = (): types.Label[] => [];

export const reducer = (state: types.Label[] = getDefaultState(), action: LabelsAction) => {
    switch (action.type) {
        case constants.ADD_LABELS:
            return updateStorageItems(state, action.payload);
        case constants.REMOVE_LABELS:
            return state.filter(l => action.payload.indexOf(l.id) === -1);
        default:
            return state;
    }
}

export default reducer;