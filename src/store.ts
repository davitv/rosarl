import createBrowserHostory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
// import { authenticateBackend } from './storage/backend/xhr';
import reducer from './reducer';

export const history = createBrowserHostory();

const persistedReducer = persistReducer({
    key: 'dayspot-data',
    storage,
    whitelist: ['auth', 'ui'],
}, reducer);


const middleware: Middleware[] = [
    thunkMiddleware,
    routerMiddleware(history),
];
if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
}
const store = createStore(persistedReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

// export const onBeforeLift = () => {
//   const authKey = store.getState().auth.key;
//   if (authKey) {
//       authenticateBackend(authKey);
//   }
// }

export default store;