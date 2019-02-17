import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
    createEntity,
    createMultipleEntities,
    retrieveData,
    removeEntities,
    removeFromStore,
} from '../actions';
import { uploadFile } from './backend';
import { retrieveData as backendRetrieve } from '../backend';
import { UserFile } from './types';

import * as constants from './constants';
import * as types from '../types';
import * as boardTypes from '../boards/types';

export interface AddFileAction {
    payload: UserFile[];
    type: constants.ADD_USER_FILES;
}

export interface AddSharedBoardFilesAction {
    payload: boardTypes.BoardShared[];
    type: constants.ADD_SHARED_BOARDS;
}

export type FilesAction = AddFileAction | AddSharedBoardFilesAction;

export const createFile = (data: File) => {
    return (dispatch: ThunkDispatch<{}, {}, Action>,  getState: () => types.AppState): Promise<UserFile[]> => {
        const token = getState().auth.token;
        return uploadFile(data, token).then((res) => {
            dispatch({
                payload: [res],
                type: constants.ADD_USER_FILES,
            });
            return [res];
        });
    };
}

export const loadUserFiles = () => retrieveData(
    (token: string) => backendRetrieve('/api/file-upload/', token),
    constants.ADD_USER_FILES
);
