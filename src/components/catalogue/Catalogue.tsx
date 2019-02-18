import * as React from 'react';
const styles = require('./Catalogue.css');

import Sidebar from '../sidebar';
import ProductsList from '../products-list';

export default class Catalogue extends React.Component {
    public render() {
        return (
            <div className={styles.className}>
                <Sidebar />
                <ProductsList />
            </div>
        );
    }
}