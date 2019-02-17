import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import uiReducer from './ui/reducer';
import tasksReducer from './tasks/reducer';
import labelsReducer from './labels/reducer';
import boardsReducer from './boards/reducer';
import filesReducer from './files/reducer';
import calendarReducer from './calendar/reducer';

export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    tasks: tasksReducer,
    labels: labelsReducer,
    boards: boardsReducer,
    files: filesReducer,
    calendar: calendarReducer,
});
