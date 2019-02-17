
import * as constants from './constants';
import { updateStorageItems } from '../utils/fp';

import { TasksAction } from './actions';
import * as types from './types';

import * as boardsConstants from '../boards/constants';
import * as boardTypes from '../boards/types';

const getDefaultState = (): types.TasksState => ({
    tasks: [],
    taskLabels: [],
    taskIntervals: [],
    taskBoardLists: [],
});

export const reducer = (state: types.TasksState = getDefaultState(), action: TasksAction) => {
    switch (action.type) {
        case constants.ADD_TASKS:
            return {
                ...state,
                tasks: updateStorageItems(state.tasks, action.payload)
            };
        case boardsConstants.ADD_SHARED_BOARDS:
            const sharedBoardTasks = action.payload.reduce((prev, curr) => prev.concat(curr.tasks), [] as types.Task[]);
            const taskBoardLists = action.payload.reduce((prev, curr) => prev.concat(curr.cards), [] as types.TaskBoardList[]);
            return {
                ...state,
                tasks: updateStorageItems(state.tasks, sharedBoardTasks),
                taskBoardLists: updateStorageItems(state.taskBoardLists, taskBoardLists)
            };
        case constants.ADD_TASK_LABELS:
            return {
                ...state,
                taskLabels: updateStorageItems(state.taskLabels, action.payload)
            };
        case constants.ADD_TASK_INTERVALS:
            return {
                ...state,
                taskIntervals: updateStorageItems(state.taskIntervals, action.payload)
            };
        case constants.REMOVE_TASK_LABELS:
            return {
                ...state,
                taskLabels: state.taskLabels.filter(
                    tl =>  tl.task !== action.payload.task && action.payload.labels.indexOf(tl.label) === -1
                )
            };
        case constants.REMOVE_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter(task => action.payload.indexOf(task.id) === -1)
            };
        case constants.REMOVE_TASK_INTERVALS:
            return {
                ...state,
                taskIntervals: state.taskIntervals.filter(interval => action.payload.indexOf(interval.id) === -1)
            };
        case constants.ADD_TASK_BOARD_LISTS:
            return {
                ...state,
                taskBoardLists: updateStorageItems(state.taskBoardLists, action.payload)
            };
        case constants.REMOVE_TASK_BOARD_LISTS:
            return {
                ...state,
                taskBoardLists: state.taskBoardLists.filter(tbl => action.payload.indexOf(tbl.id) === -1)
            };
        default:
            return state;
    }
}

export default reducer;