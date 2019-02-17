import './App.css';

import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import './icons';

import Header from './components/header';
import Catalogue from './components/catalogue';

class App extends React.Component {
  public render() {
    return (
      <div >
        <Header />
        <Route
            path='/'
            exact={true}
        >
          <Catalogue />
        </Route>
      </div>
    );
  }
}

export default App;
