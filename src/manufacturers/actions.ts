import { retrieveData as backendRetrieve } from '../backend';
import {
    retrieveData,
} from '../actions';
import * as constants from './constants';
import * as types from './types';

export interface LoadManufacturers {
    type: constants.LOAD_MANUFACTURERS;
    payload: types.Manufacturer[];
}

export type ManufacturersAction = LoadManufacturers;

export const loadManufacturers = () => retrieveData(
    (token: string) => backendRetrieve('/api/manufacturers/', token),
    constants.LOAD_MANUFACTURERS
);
