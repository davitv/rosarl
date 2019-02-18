import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import uiReducer from './ui/reducer';
import categoriesReducer from './categories/reducer';
import productsReducrer from './products/reducer';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    router: routerReducer,
    categories: categoriesReducer,
    products: productsReducrer,
});
