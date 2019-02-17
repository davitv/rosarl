import {
    createEntity,
    createMultipleEntities,
    retrieveData,
    removeEntities,
    removeFromStore,
} from '../actions';

import * as constants from './constants';

import { Task, TaskLabel, TaskInterval, TaskBoardList } from './types';

import {
    addTasks,
    retrieveTasks,
    retrieveTaskLabels,
    addTaskIntervals,
    removeTaskIntervals,
    removeTasks as removeBackend,
    retrieveTaskIntervals
} from './backend';
import { persistData, retrieveData as backendRetrieve, removeData } from '../backend';
import * as boardsConstants from '../boards/constants';

import { BoardShared } from '../boards/types';

export interface AddTasks {
    type: constants.ADD_TASKS;
    payload: Task[];
}

export interface AddSharedBoard {
    type: boardsConstants.ADD_SHARED_BOARDS;
    payload: BoardShared[];
}

export interface RemoveTasks {
    type: constants.REMOVE_TASKS;
    payload: number[];
}

export interface AddTaskLabels {
    type: constants.ADD_TASK_LABELS;
    payload: TaskLabel[];
}

export interface RemoveTaskLabels {
    type: constants.REMOVE_TASK_LABELS;
    payload: {
        task: number;
        labels: number[];
    };
}

export interface RemoveTaskIntervals {
    type: constants.REMOVE_TASK_INTERVALS;
    payload: number[];
}

export interface AddTaskIntervals {
    type: constants.ADD_TASK_INTERVALS;
    payload: TaskInterval[];
}


export interface RemoveTaskBoardLists {
    type: constants.REMOVE_TASK_BOARD_LISTS;
    payload: number[];
}

export interface AddTaskBoardsLists {
    type: constants.ADD_TASK_BOARD_LISTS;
    payload: TaskBoardList[];
}

export type TasksAction = (
    AddTasks |
    RemoveTasks |
    AddTaskLabels |
    RemoveTaskLabels |
    AddTaskIntervals |
    RemoveTaskIntervals |
    AddTaskBoardsLists |
    RemoveTaskBoardLists |
    AddSharedBoard
);

export const createTask = (task: Partial<Task>) => createEntity(task, addTasks, constants.ADD_TASKS);

export const createTaskInterval = (taskId: number, start: number, stop?: number) => createEntity(
    {task: taskId, start, stop}, addTaskIntervals, constants.ADD_TASK_INTERVALS
);

export const createTaskBoardList = (data: Partial<TaskBoardList>) => createMultipleEntities(
    [data],
    (data: TaskBoardList[], token: string) => persistData('/api/board-list-tasks/', data, token),
    constants.ADD_TASK_BOARD_LISTS,
    false
);

export const updateTaskBoardList = createTaskBoardList;

export const reorderBoardTaskLists = (data: {id: number; order: number}[]) => createMultipleEntities(
    data,
    (data: TaskBoardList[], token: string) => persistData('/api/board-list-tasks/', data, token),
    constants.ADD_TASK_BOARD_LISTS,
    true
);

export const loadBoardListTasks = () => retrieveData(
    (token: string) => backendRetrieve('/api/board-list-tasks/', token),
    constants.ADD_TASK_BOARD_LISTS
);

export const removeBoardListTasks = (ids: number[]) => removeEntities(
    (token: string, ids: number[]) => removeData('/api/board-list-tasks/', token, ids),
    constants.REMOVE_TASK_BOARD_LISTS,
    ids
);


export const updateTaskInterval = (data: Partial<TaskInterval>) => createEntity(
    data, addTaskIntervals, constants.ADD_TASK_INTERVALS
);
export const deleteTaskInterval = (taskIntervalId: number) => removeEntities(
    removeTaskIntervals, constants.REMOVE_TASK_INTERVALS, [taskIntervalId]
);
export const loadTaskIntervals = () => retrieveData(
    retrieveTaskIntervals, constants.ADD_TASK_INTERVALS
);

export const reorderTasks = (task: Partial<Task>[]) => createMultipleEntities(task, addTasks, constants.ADD_TASKS, true);

export const loadTasks = () => retrieveData(retrieveTasks, constants.ADD_TASKS);
export const removeTasks = (ids: number[]) => removeEntities(removeBackend, constants.REMOVE_TASKS, ids);

export const loadTaskLabels = () => retrieveData(retrieveTaskLabels, constants.ADD_TASK_LABELS);
export const removeTaskLabels = (task: number, ids: number[]) => removeFromStore({labels: ids, task: task}, constants.REMOVE_TASK_LABELS);