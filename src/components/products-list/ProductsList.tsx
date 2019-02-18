import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { Product } from '../../products/types';

import ProductFilters from '../product-filters';
import ProductItem from './ListItem';
import BottomScrollListener from 'react-bottom-scroll-listener';

const styles = require('./ProductsList.css');

const loaderWhiteURL = require('../../assets/loader-white.png');
const loaderDarkURL = require('../../assets/loader-black.png');

export interface Props {
    products: Product[];
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
            products,
            onProductTitleClick,
            openProducts,
            onAttributeClick,
            isLoading,
            onBottomScroll,
            selectedFilters
        } = this.props;

        const dublicates: number[] = [];

        const renderProducts = products.filter((({product_id}) => {
            if (dublicates.indexOf(product_id) === -1) {
                dublicates.push(product_id);
                return true;
            }
            return false;
        }));

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
                                    <ProductItem
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