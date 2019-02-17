import * as React from 'react';

const styles = require('./Sidebar.css');

import SearchForm from '../search-form';
import Categories from '../categories';

export default class Sidebar extends React.Component {
    public render() {
        return (
            <div className={styles.className}>
                <SearchForm />
                <Categories />
            </div>
        );
    }
}