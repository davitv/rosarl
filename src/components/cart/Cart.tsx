import * as React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import CartInput from '../cart-input';

import { IMAGES_PATH_URL } from '../../products/constants';

const styles = require('./Cart.css');

export interface Props {
    isOpen: boolean;
    onRemoveClick: (productId: number) => void;
    products: {
        product_id: number;
        name: string;
        images: string[];
        price: number;
        amount: number;
    }[];
}

export default class Cart extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    public render() {
        const {
            isOpen,
            products,
        } = this.props;

        return (
            <div
                className={cn(
                    styles.className,
                    {[styles.collapsed]: !isOpen}
                )}
            >
                <div className={styles.productsList}>
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

            </div>
        );
    }

    private handleRemoveButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.onRemoveClick(parseInt(e.currentTarget.value, 10));
    }
}