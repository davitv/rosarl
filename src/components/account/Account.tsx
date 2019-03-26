import * as React from 'react';
import * as types from '../../types';

import OrderForm from '../order-form';

const styles = require('./Account.css');

export interface Props {
    addresses: types.Address[];
    orders: types.Order[];
}

export default class Account extends React.Component<Props> {
    public render() {
        return (
            <div className={styles.className}>
                <div className={styles.orders}>
                    <div className={styles.ordersHeadline}>
                        Список заказов
                    </div>
                    <div className={styles.ordersList}>
                        <div className={styles.order}>
                            {this.props.orders.map(order => <OrderForm intialValues={{...order, order_type: 0}} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}