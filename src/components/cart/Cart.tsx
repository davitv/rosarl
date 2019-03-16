import * as React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { CartState } from '../../ui/types';

import CartInput from '../cart-input';
import DeliveryForm from '../delivery-form';
import OrderForm from '../order-form';

import { IMAGES_PATH_URL } from '../../products/constants';

const styles = require('./Cart.css');

export interface Props {
    isOpen: boolean;
    cartState: CartState;
    products: {
        product_id: number;
        name: string;
        images: string[];
        price: number;
        amount: number;
    }[];
    isDeliveryFormValid: boolean;
    onRemoveClick: (productId: number) => void;
    onCartStateButtonClick: (state: CartState) => void;
}

export default class Cart extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleCartStateButtonClick = this.handleCartStateButtonClick.bind(this);
    }

    public render() {
        const {
            isOpen,
            isDeliveryFormValid,
            cartState,
            products,
        } = this.props;

        const isEmpty = products.length === 0;

        return (
            <div
                className={cn(
                    styles.className,
                    {[styles.collapsed]: !isOpen}
                )}
            >
                <div className={styles.tabs}>
                    <button
                        type="button"
                        value={CartState.productsList}
                        onClick={this.handleCartStateButtonClick}
                        className={cn(
                            styles.tabButton,
                            {[styles.tabButtonActive]: cartState === CartState.productsList}
                        )}
                    >
                        Корзина
                    </button>
                    <button
                        type="button"
                        disabled={isEmpty}
                        value={CartState.deliveryMethod}
                        onClick={this.handleCartStateButtonClick}
                        className={cn(
                            styles.tabButton,
                            {[styles.tabButtonDisabled]: isEmpty},
                            {[styles.tabButtonActive]: cartState === CartState.deliveryMethod}
                        )}
                    >
                        Способ получения
                    </button>
                    <button
                        type="button"
                        value={CartState.form}
                        disabled={!isDeliveryFormValid || isEmpty}
                        onClick={this.handleCartStateButtonClick}
                        className={cn(
                            styles.tabButton,
                            {[styles.tabButtonDisabled]: !isDeliveryFormValid || isEmpty},
                            {[styles.tabButtonActive]: cartState === CartState.form},
                        )}
                    >
                        Оформление
                    </button>
                    <button
                        type="button"
                        disabled={cartState !== CartState.result}
                        className={cn(
                            styles.tabButton,
                            {[styles.tabButtonDisabled]: cartState !== CartState.result},
                            {[styles.tabButtonActive]: cartState === CartState.result}
                        )}
                    >
                        Результат
                    </button>
                </div>

                <div
                    className={cn(
                        styles.productsList,
                        {[styles.hidden]: cartState !== CartState.productsList}
                    )}
                >
                    {isEmpty &&
                        <div className={styles.empty}>
                            <strong>Корзина пуста</strong>. Пожалуйста, добавьте товар для продолжения оформления заказа.
                        </div>
                    }
                    {products.map(product =>
                        <div
                            className={styles.product}
                            key={product.product_id}
                        >
                            <div className={styles.removeWrapper}>
                                <button
                                     type="button"
                                     onClick={this.handleRemoveButtonClick}
                                     value={product.product_id}
                                     className={styles.btnRemove}
                                >
                                    <Icon icon="times" />
                                </button>
                            </div>

                            <div className={styles.photoWrapper}>
                                <img
                                    className={styles.photo}
                                    src={product.images.length ? IMAGES_PATH_URL + product.images[0] : undefined}
                                />
                            </div>

                            <div className={styles.nameWrapper}>
                                {product.name}
                            </div>

                            <div className={styles.cartInputWrapper}>
                                <CartInput productId={product.product_id} />
                            </div>

                            <div className={styles.priceWrapper}>
                                {(product.price * product.amount).toFixed(2)} Руб.
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        styles.totals,
                        {[styles.hidden]: cartState !== CartState.productsList}
                    )}
                >
                    Общая стоимость товаров: {products.reduce((p, c) => p + (c.price * c.amount), 0).toFixed(2)} Руб.
                    <button
                        type="button"
                        className={cn(styles.button, styles.floatRight)}
                    >
                        Далее
                    </button>
                </div>

                <div
                    className={cn(
                        styles.deliveryMethod,
                        {[styles.hidden]: cartState !== CartState.deliveryMethod}
                    )}
                >

                    <DeliveryForm />
                </div>

                <div
                    className={cn(
                        styles.orderForm,
                        {[styles.hidden]: cartState !== CartState.form}
                    )}
                >

                    <OrderForm />
                </div>


            </div>
        );
    }

    private handleRemoveButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.onRemoveClick(parseInt(e.currentTarget.value, 10));
    }

    private handleCartStateButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        const nextState = parseInt(e.currentTarget.value, 10);
        this.props.onCartStateButtonClick(nextState);
    }
}