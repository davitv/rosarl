import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import uiReducer from './ui/reducer';
import categoriesReducer from './categories/reducer';

export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    categories: categoriesReducer,
});
