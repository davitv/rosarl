import * as React from 'react';

import { OrderData } from '../../cart/types';
import * as types from '../../types';

import Print from '../print';

export interface Props {
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    products: {
        amount: number;
        product: {
            product_id: number;
            name: string;
            price: number
        }
    }[];
    productsListView?: boolean;
}

const styles = require('./OrderResults.css');


export default class OrderResults extends React.Component<Props> {

    private print() {

    }
    public render() {
        const {
            id,
            first_name,
            last_name,
            patronymic,
            products,
            productsListView,
        } = this.props;

        return (
            <div className={styles.className + (productsListView ? ' ' + styles.listView : '')}>

                    <div>
                        {!productsListView &&
                            <h3 className={styles.headline}>
                                Спасибо! Заказ номер {id} принят!
                            </h3>
                        }
                        {!productsListView &&
                            <h3 className={styles.orderName}>
                                ФИО: {first_name} {last_name} {patronymic}
                            </h3>
                        }
                        <h3 className={styles.productsListHeadline}>Список товаров</h3>
                        {products.filter(({product}: any) => product !== null).map(({amount, product: {product_id, name, price}}: any) =>
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
                                {Math.round(products.filter(({product}: any) => product !== null).reduce((p, {amount, product: {price}}: any) => amount * price, 0) * 100) / 100 } Руб.
                            </span>
                        </h3>
                    </div>

                    {/*<a href="#" className={styles.printLink}>Распечатать заказ</a>*/}
            </div>
        );
    }
}