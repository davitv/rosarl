import * as React from 'react';

import SearchForm from '../search-form';
import Categories from '../categories';

const styles = require('./Sidebar.css');

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