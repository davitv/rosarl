import "babel-polyfill";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store, { history, persistor } from './store';

ReactDOM.render(
    <Provider store={store} >
        <PersistGate persistor={persistor} >
            <ConnectedRouter history={history} >
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
