import * as types from './types';

import { persistData, retrieveData, removeData } from '../backend';

export const addLabels = (data: Partial<types.Label>[], token: string) => persistData('/api/labels/', data, token);
export const retrieveLabels: (token: string) => Promise<types.Label[]> = (token: string) => retrieveData('/api/labels/', token);
export const removeLabels: (token: string, ids: number[]) => Promise<void> = (token: string, ids: number[]) => removeData('/api/labels/', token, ids);
