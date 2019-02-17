import * as types from './types';

import { persistData, retrieveData, removeData } from '../backend';

export const addTasks = (tasks: Partial<types.Task>[], token: string) => persistData('/api/tasks/', tasks, token);
export const removeTasks: (token: string, ids: number[]) => Promise<void> = (token: string, ids: number[]) => removeData('/api/tasks/', token, ids);
export const removeTaskIntervals: (token: string, ids: number[]) => Promise<void> = (token: string, ids: number[]) => removeData('/api/task-intervals/', token, ids);

export const addTaskIntervals = (taskIntervals: Partial<types.TaskInterval>[], token: string) => persistData('/api/task-intervals/', taskIntervals, token);
export const retrieveTaskIntervals = (token: string) => retrieveData('/api/task-intervals/', token);

export const retrieveTasks: (token: string) => Promise<types.Task[]> = (token: string) => retrieveData('/api/tasks/', token);
export const retrieveTaskLabels: (token: string) => Promise<types.TaskLabel[]> = (token: string) => retrieveData('/api/task-labels/', token);


