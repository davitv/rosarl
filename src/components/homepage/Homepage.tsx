import * as React from 'react';

import Sidebar from '../sidebar';

const styles = require('./Homepage.css');


export default class Homepage extends React.Component {
    public render() {
        return (
            <div className={styles.className}>
                <Sidebar />

                <div className={styles.mapWrapper}></div>
            </div>
        );
    }
}