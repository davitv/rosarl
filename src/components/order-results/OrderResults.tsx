import * as React from 'react';

import { OrderData } from '../../cart/types';
import * as types from '../../types';

export interface Props {
    order: OrderData;
}

const styles = require('./OrderResults.css');


export default class OrderResults extends React.Component<Props> {
    public render() {
        const {
            id,
            first_name,
            last_name,
            patronymic,
        } = this.props.order;

        return (
            <div className={styles.className}>
                <h3 className={styles.headline}>
                    Спасибо! Заказ номер {id} принят!
                </h3>
                <h3 className={styles.orderName}>
                    ФИО: {first_name} {last_name} {patronymic}
                </h3>
                <h3 className={styles.productsListHeadline}>Список товаров</h3>
                {this.props.order.products.map(({amount, product: {product_id, name, price}}: any) =>
                    <div key={product_id} className={styles.product}>
                        <span className={styles.productName}>
                            {name}
                        </span>
                        <span className={styles.productPrice}>
                            ({amount}) {price}
                        </span>
                    </div>
                )}
                <h3 className={styles.priceSummary}>
                    Общая стоимость товаров
                    <span className={styles.total}>
                        {this.props.order.products.reduce((p, {amount, product: {price}}: any) => amount * price, 0)} Руб.
                    </span>
                </h3>

                <a href="#" className={styles.printLink}>Распечатать заказ</a>
            </div>
        );
    }
}