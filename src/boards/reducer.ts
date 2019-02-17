
import * as constants from './constants';
import { updateStorageItems } from '../utils/fp';

import { BoardsAction } from './actions';
import * as types from './types';

const getDefaultState = (): types.BoardsState => ({
    boards: [],
    boardLists: [],
    boardImages: [],
    boardListStyles: [],
    sharedBoards: []
});

export const reducer = (state: types.BoardsState = getDefaultState(), action: BoardsAction) => {
    switch (action.type) {
        case constants.ADD_BOARDS:
            return {
                ...state,
                boards: updateStorageItems(state.boards, action.payload)
            };
        case constants.REMOVE_BOARDS:
            return {
                ...state,
                boards: state.boards.filter(board => action.payload.indexOf(board.id) === -1)
            };
        case constants.ADD_BOARD_LISTS:
            return {
                ...state,
                boardLists: updateStorageItems(state.boardLists, action.payload)
            };
        case constants.ADD_BOARD_FILES:
            return {
                ...state,
                boardImages: updateStorageItems(state.boardImages, action.payload)
            };
        case constants.ADD_SHARED_BOARDS:
            const boardLists = action.payload.reduce((prev, curr) => prev.concat(curr.lists), [] as types.BoardList[])
            const boardFiles = action.payload.reduce((prev, curr) => prev.concat(curr.boardFiles), [] as types.BoardImage[])
            return {
                ...state,
                boardLists: updateStorageItems(state.boardLists, boardLists),
                boardImages: updateStorageItems(state.boardImages, boardFiles),
                sharedBoards: updateStorageItems(state.sharedBoards, action.payload),
            };
        case constants.REMOVE_BOARD_FILES:
            return {
                ...state,
                boardImages: state.boardImages.filter(board => action.payload.indexOf(board.id) === -1)
            };
        case constants.REMOVE_BOARD_LISTS:
            return {
                ...state,
                boardLists: state.boardLists.filter(board => action.payload.indexOf(board.id) === -1)
            };
        case constants.ADD_BOARD_LIST_STYLES:
            return {
                ...state,
                boardListStyles: updateStorageItems(state.boardListStyles, action.payload),
            };
        default:
            return state;
    }
}

export default reducer;