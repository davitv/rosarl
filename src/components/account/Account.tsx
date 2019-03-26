import * as React from 'react';
import * as types from '../../types';

import OrderForm from '../order-form';
import DeliveryForm from '../delivery-form';
import Order from '../order-results/OrderResults';

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
                    <h3 className={styles.ordersHeadline}>
                        Список заказов
                    </h3>
                    <div className={styles.ordersList}>
                        {this.props.orders.map(order =>
                            <div className={styles.order} key={order.id} >
                                <OrderForm
                                    intialValues={order}
                                    readOnly={true}
                                />
                                <Order
                                    productsListView={true}
                                    id={order.id}
                                    first_name={order.first_name}
                                    last_name={order.last_name}
                                    patronymic={order.patronymic}
                                    products={order.products}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.addresses}>
                    <h3 className={styles.ordersHeadline}>
                        Список адресов
                    </h3>
                    <div className={styles.ordersList}>
                        {this.props.addresses.map(address =>
                            <div className={styles.address} key={address.id} >
                                <DeliveryForm
                                    initialValues={address}
                                    readOnly={true}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}