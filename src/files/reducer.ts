
import * as constants from './constants';
import { updateStorageItems } from '../utils/fp';

import { FilesAction } from './actions';
import * as types from './types';

const getDefaultState = (): types.FilesState => ({
    files: [],
});

export const reducer = (state: types.FilesState = getDefaultState(), action: FilesAction) => {
    switch (action.type) {
        case constants.ADD_USER_FILES:
            return {
                ...state,
                files: updateStorageItems(state.files, action.payload.map(file => ({
                    ...file,
                    path: constants.FILES_PATH + file.path
                })))
            };
        case constants.ADD_SHARED_BOARDS:
            const files = action.payload.reduce((prev, curr) => prev.concat(curr.userFiles), [] as types.UserFile[]);
            return {
                ...state,
                files: updateStorageItems(state.files, files.map(file => ({
                    ...file,
                    path: constants.FILES_PATH + file.path
                })))
            };
        default:
            return state;
    }
}

export default reducer;