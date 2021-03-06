import './App.css';

import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import './icons';

import Header from './components/header';
import Homepage from './components/homepage';
import Catalogue from './components/catalogue';
import Account from './components/account';
import Cart from './components/cart';
import PrintCompanyInfo from './components/print-company-info';
import ProductPrint from './components/product-print';

class App extends React.Component {
  public render() {
    return (
      <div >

          <Header />
          <Cart />

          <Route
              path='/'
              exact={true}
              component={Homepage}
          />
          <Route
              path='/print/product/:product/'
              exact={true}
              component={ProductPrint}
          />
          <Route
              path='/print/info/:infoType/'
              exact={true}
              component={PrintCompanyInfo}
          />
          <Route
              path='/account/'
              exact={true}
              component={Account}
          />
          <Route
              path='/catalogue/:category/'
              exact={true}
              component={Catalogue}
          />
          <Route
              path='/category/:category/'
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
