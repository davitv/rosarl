import * as React from 'react';

import * as types from '../../types';

const styles = require('./ProductPrint.css');

export interface Props {
    product: types.Product;
}

export default class ProductPrint extends React.Component<Props> {
    public render() {
        const {
            product
        } = this.props;

        return (
            <div className={styles.className}></div>
        );
    }
}