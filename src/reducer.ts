import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import uiReducer from './ui/reducer';
import categoriesReducer from './categories/reducer';
import productsReducrer from './products/reducer';
import cartReducer from './cart/reducer';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    router: routerReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    products: productsReducrer,
});
