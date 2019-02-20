import './App.css';

import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import './icons';

import Header from './components/header';
import Homepage from './components/homepage';
import Catalogue from './components/catalogue';

class App extends React.Component {
  public render() {
    return (
      <div >
        <Header />
        <Route
            path='/'
            exact={true}
            component={Homepage}
        />
        <Route
            path='/catalogue/:category/'
            exact={true}
            component={Catalogue}
        />
        <Route
            path='/catalogue/'
            exact={true}
            component={Catalogue}
        />
      </div>
    );
  }
}

export default App;
