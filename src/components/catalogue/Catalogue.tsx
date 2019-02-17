import * as React from 'react';
const styles = require('./Catalogue.css');

import Sidebar from '../sidebar';

export default class Catalogue extends React.Component {
    public render() {
        return (
            <div className={styles.className}>
                <Sidebar />
            </div>
        );
    }
}