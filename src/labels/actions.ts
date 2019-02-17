import {
    createEntity,
    retrieveData,
    removeEntities,
} from '../actions';

import * as constants from './constants';

import { Label } from './types';

import { addLabels, retrieveLabels, removeLabels as removeBackend } from './backend';

export interface AddLabels {
    type: constants.ADD_LABELS;
    payload: Label[];
}

export interface RemoveLabels {
    type: constants.REMOVE_LABELS;
    payload: number[];
}

export type LabelsAction = AddLabels | RemoveLabels;

export const createLabel = (task: Partial<Label>) => createEntity(task, addLabels, constants.ADD_LABELS);
export const loadLabels = () => retrieveData(retrieveLabels, constants.ADD_LABELS);
export const removeLabels = (ids: number[]) => removeEntities(removeBackend, constants.REMOVE_LABELS, ids);
