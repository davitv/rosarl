import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { Product as ProductType } from '../../products/types';

import ProductFilters from '../product-filters';
import Product from '../product';
import BottomScrollListener from 'react-bottom-scroll-listener';

const styles = require('./ProductsList.css');

export interface Props {
    products: ProductType[];
    openProducts: number[];
    isLoading: boolean;
    selectedFilters: number[];
    onBottomScroll: () => void;
    onProductTitleClick: (productId: number) => void;
    onAttributeClick: (attributeId: number) => void;
}


export default class ProductsList extends React.Component<Props> {
    public render() {
        const {
            onProductTitleClick,
            openProducts,
            onAttributeClick,
            isLoading,
            onBottomScroll,
            selectedFilters
        } = this.props;

        return (
            <div className={styles.className}>
                <div className={styles.flexTop}>
                    <ProductFilters
                        onAttributeClick={onAttributeClick}
                        selectedFilters={selectedFilters}
                    />
                    <div className={styles.headline}>
                        <div className={styles.w5}></div>
                        <div className={styles.w10}>Артикул</div>
                        <div className={styles.w45}>Наименование</div>
                        <div className={styles.w15}></div>
                        <div className={styles.w10}>Цена</div>
                        <div className={styles.w15}></div>
                    </div>
                </div>
                <BottomScrollListener onBottom={onBottomScroll}>
                  {(scrollRef: any) => (
                        <div className={styles.flexBottom} ref={scrollRef} >
                            <div className={styles.listWrapper}>
                                {this.props.products.map(p =>
                                    <Product
                                        key={p.product_id}
                                        selectedAttributes={selectedFilters}
                                        onAttributeClick={onAttributeClick}
                                        showDetails={openProducts.indexOf(p.product_id) !== -1}
                                        onTitleClick={onProductTitleClick}
                                        {...p}
                                    />
                                )}
                            </div>
                            {isLoading &&
                                <div className={styles.loading}>
                                    <h2>
                                        <Icon icon="spinner" spin fixedWidth /> Загрузка товаров...
                                    </h2>
                                </div>
                            }
                        </div>
                )}
                  </BottomScrollListener>
            </div>
        );
    }
}