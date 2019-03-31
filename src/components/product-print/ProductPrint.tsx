import * as React from 'react';

import * as types from '../../types';

import { IMAGES_PATH_URL } from '../../products/constants';

const styles = require('./ProductPrint.css');

export interface Props {
    product: types.Product;
}

export default class ProductPrint extends React.Component<Props> {
    componentDidMount() {
        print();
    }

    public render() {
        const {
            product: {
                product_id,
                name,
                images,
                product_full_image,
                description,
                product_s_desc,
                weight,
                height,
                length,
                width,
            }
        } = this.props;

        return (
            <div className={styles.className}>
                <h1 className={styles.productName}>{name}</h1>
                <div className={styles.mainInfo}>
                    <p className={styles.description}>
                        <img src={IMAGES_PATH_URL + product_full_image} className={styles.image} />
                        {description}
                    </p>
                </div>
                <div className={styles.techInfo}>
                    <h3 className={styles.techHeadline}>Технические характеристики</h3>
                    <ul className={styles.specList}>
                        <li>Вес: {weight}</li>
                        <li>Длина: {length}</li>
                        <li>Ширина: {width}</li>
                        <li>Высота: {height}</li>
                    </ul>
                </div>
            </div>
        );
    }
}