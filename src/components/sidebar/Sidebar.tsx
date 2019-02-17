import * as React from 'react';
import { Route } from 'react-router-dom';

const styles = require('./Sidebar.css');

import SearchForm from '../search-form';
import Categories from '../categories';

export default class Sidebar extends React.Component {
    public render() {
        return (
            <div className={styles.className}>
                <SearchForm />
                <Route path="/" component={Categories} exact={true} />
                <Route
                    path="/category/:category/"
                    component={Categories}
                    exact={true}
                />
            </div>
        );
    }
}