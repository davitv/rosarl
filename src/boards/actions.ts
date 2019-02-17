import {
    createEntity,
    createMultipleEntities,
    retrieveData,
    removeEntities,
} from '../actions';

import * as constants from './constants';

import {
    Board,
    BoardList,
    BoardImage,
    BoardListStyle,
    BoardShared,
} from './types';

import {
    retrieveData as backendRetrieve,
    persistData,
    removeData
} from '../backend';

export interface AddBoards {
    type: constants.ADD_BOARDS;
    payload: Board[];
}

export interface AddSharedBoards {
    type: constants.ADD_SHARED_BOARDS;
    payload: BoardShared[];
}

export interface RemoveBoards {
    type: constants.REMOVE_BOARDS;
    payload: number[];
}

export interface AddBoardLists {
    type: constants.ADD_BOARD_LISTS;
    payload: Board[];
}

export interface RemoveBoardLists {
    type: constants.REMOVE_BOARD_LISTS;
    payload: number[];
}

export interface AddBoardImages {
    type: constants.ADD_BOARD_FILES;
    payload: BoardImage[];
}

export interface AddBoardListStyles {
    type: constants.ADD_BOARD_LIST_STYLES;
    payload: BoardListStyle[];
}

export interface RemoveBoardImages {
    type: constants.REMOVE_BOARD_FILES;
    payload: number[];
}

export type BoardsAction = (
    AddBoards |
    RemoveBoards |
    AddBoardLists |
    RemoveBoardLists |
    AddBoardImages |
    RemoveBoardImages |
    AddBoardListStyles |
    AddSharedBoards
);

export const loadBoards = () => retrieveData(
    (token: string) => backendRetrieve('/api/boards/', token),
    constants.ADD_BOARDS
);

export const loadSharedBoards = (slug: string) => retrieveData(
    (token: string) => backendRetrieve('/api/boards/' + slug + '/', token),
    constants.ADD_SHARED_BOARDS
);

export const loadBoardListStyles = () => retrieveData(
    (token: string) => backendRetrieve('/api/board-list-styles/', token),
    constants.ADD_BOARD_LIST_STYLES
);

export const createBoard = (data: Partial<Board>) => createMultipleEntities(
    [data],
    (data: Board[], token: string) => persistData('/api/boards/', data, token),
    constants.ADD_BOARDS,
    false
);

export const createStyle = (data: Partial<{list_id: number, css: string}>) => createMultipleEntities(
    [data as Partial<BoardListStyle>],
    (data: BoardListStyle[], token: string) => persistData('/api/board-list-styles/', data, token),
    constants.ADD_BOARD_LIST_STYLES,
    false
);

export const reorderBoards = (boards: {id: number, order: number}[]) => createMultipleEntities(
    boards,
    (data: Board[], token: string) => persistData('/api/boards/', data, token),
    constants.ADD_BOARDS,
    true
);

export const removeBoards = (ids: number[]) => removeEntities(
    (token: string, ids: number[]) => removeData('/api/boards/', token, ids),
    constants.REMOVE_BOARDS,
    ids
);


export const createBoardList = (data: Partial<BoardList>) => createMultipleEntities(
    [data],
    (data: BoardList[], token: string) => persistData('/api/board-lists/', data, token),
    constants.ADD_BOARD_LISTS,
    false
);


export const updateBoardName = (data: Partial<BoardList>) => createMultipleEntities(
    [data],
    (data: BoardList[], token: string) => persistData('/api/board-lists/', data, token),
    constants.ADD_BOARD_LISTS,
    true
);


export const updateBoard = (data: Partial<BoardList>) => createMultipleEntities(
    [data],
    (data: BoardList[], token: string) => persistData('/api/board-lists/', data, token),
    constants.ADD_BOARD_LISTS,
    true
);


export const reorderBoardLists = (data: {id: number; order: number}[]) => createMultipleEntities(
    data,
    (data: BoardList[], token: string) => persistData('/api/board-lists/', data, token),
    constants.ADD_BOARD_LISTS,
    true
);

export const loadBoardLists = () => retrieveData(
    (token: string) => backendRetrieve('/api/board-lists/', token),
    constants.ADD_BOARD_LISTS
);

export const removeBoardLists = (ids: number[]) => removeEntities(
    (token: string, ids: number[]) => removeData('/api/board-lists/', token, ids),
    constants.REMOVE_BOARD_LISTS,
    ids
);

export const loadBoardImages = () => retrieveData(
    (token: string) => backendRetrieve('/api/board-files/', token),
    constants.ADD_BOARD_FILES
);

export const addBoardImage = (data: Partial<BoardImage>) => createMultipleEntities(
    [data],
    (data: BoardImage[], token: string) => persistData('/api/board-files/', data, token),
    constants.ADD_BOARD_FILES,
    false
);

export const removeBoardFiles = (ids: number[]) => removeEntities(
    (token: string, ids: number[]) => removeData('/api/board-files/', token, ids),
    constants.REMOVE_BOARD_FILES,
    ids
);
