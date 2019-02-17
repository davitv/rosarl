import './App.css';

import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import Header from './components/header';

class App extends React.Component {
  public render() {
    return (
      <div >
        <Route
            path='/'
            exact={true}
        >
            <div>
                <Route component={Header} />
            </div>
        </Route>
      </div>
    );
  }
}

export default App;
