
import * as constants from './constants';
import { updateStorageItems } from '../utils/fp';

import { TasksAction } from '../tasks/actions';
import * as types from './types';

const getDefaultState = (): types.CalendarState => ({
    dates: []
});

const dateReg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
const re2 = /\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])/g;

export const reducer = (state: types.CalendarState = getDefaultState(), action: TasksAction) => {
    switch (action.type) {
        case constants.ADD_TASKS:
            return {
                ...state,
                dates: [] //action.payload.map(task => task.content.match(re2)).filter(c => !!c)
            };
        default:
            return state;
    }
}

export default reducer;