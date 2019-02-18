import * as React from 'react';
import cn from 'classnames';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { Product } from '../../products/types';
import { IMAGES_PATH_URL } from '../../products/constants';

const styles = require('./ProductsList.css');

const loaderWhiteURL = require('../../assets/loader-white.png');
const loaderDarkURL = require('../../assets/loader-black.png');

export interface Props {
    products: Product[];
    openProducts: number[];
    onProductTitleClick: (productId: number) => void;
}

export enum ActiveTabChoices {
    DESCRIPTION = 1,
    TECH_DATA
}

export interface ProductItemState {
    activeTab: ActiveTabChoices;
}

export interface ProductItemProps extends Product {
    showDetails: boolean;

    onTitleClick: (productId: number) => void;
}

class ProductItem extends React.Component<ProductItemProps, ProductItemState> {
    constructor(props: ProductItemProps) {
        super(props);
        this.state = {
            activeTab: ActiveTabChoices.DESCRIPTION
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
    }

    public render() {
        const {
            article,
            name,
            description,
            price,
            weight,
            length,
            width,
            height,
            attributes,
            showDetails,
            images
        } = this.props;

        const {
            activeTab
        } = this.state;

        return (
            <div
                className={cn(
                    styles.product,
                    {[styles.productOpen]: showDetails}
                )}
            >
                <div
                    className={styles.productTitle}
                    onClick={this.handleTitleClick}
                >
                    <div className={styles.w5}>
                        <img
                            className={styles.mainPhoto}
                            src={images.length ? IMAGES_PATH_URL + images[0].image_url : undefined}
                            alt=""
                        />
                    </div>
                    <div
                        className={cn(
                            styles.w10,
                            styles.article
                        )}
                    >
                        {article}
                    </div>
                    <div

                        className={cn(
                            styles.w45,
                            styles.name
                        )}
                    >
                        {name}
                    </div>
                    <div
                        className={cn(
                            styles.w15,
                            styles.attributes,
                        )}
                    >
                        <Icon icon="search" />
                    </div>
                    <div
                        className={cn(
                            styles.w10,
                            styles.price
                        )}
                    >
                        {price}
                    </div>
                    <div
                        className={cn(
                            styles.w15,
                            styles.cartConrols,
                        )}
                    >
                        <div className={styles.inputWrapper}>
                            <input type="text" className={styles.input} />
                            <button
                                className={cn(
                                    styles.btn,
                                    styles.btnIncrement
                                )}
                            >
                                 <Icon icon="chevron-up" />
                            </button>
                            <button
                                className={cn(
                                    styles.btn,
                                    styles.btnDecrement
                                )}
                            >
                                 <Icon icon="chevron-down" />
                            </button>
                        </div>
                        <button className={styles.btnAdd}>
                            <img src={loaderDarkURL} alt="Добавить в корзину" />
                        </button>

                    </div>
                </div>

                <div
                    className={cn(
                        styles.productDetails,
                        {[styles.productDetailsShown]: showDetails}
                    )}
                >
                    <div className={styles.tabs}>
                        <div className={styles.tabLinks}>
                            <button
                                value={ActiveTabChoices.DESCRIPTION}
                                type="button"
                                onClick={this.handleTabClick}

                                className={cn(
                                    styles.tabLink,
                                    {[styles.tabLinkActive]: activeTab === ActiveTabChoices.DESCRIPTION}
                                )}
                            >
                                Описание
                            </button>

                            <button
                                value={ActiveTabChoices.TECH_DATA}
                                type="button"
                                onClick={this.handleTabClick}

                                className={cn(
                                    styles.tabLink,
                                    {[styles.tabLinkActive]: activeTab === ActiveTabChoices.TECH_DATA}
                                )}
                            >
                                Технические характеристики
                            </button>

                            <button
                                className={styles.tabLink}
                            >
                                <Icon icon="print" />
                            </button>
                        </div>
                        <div
                            className={cn(
                                styles.tabContent,
                                {[styles.tabContentActive]: activeTab === ActiveTabChoices.DESCRIPTION}
                            )}
                        >
                            {description.split(';').map((text, i) => <p key={i}>{text}</p>)}
                        </div>

                        <div
                            className={cn(
                                styles.tabContent,
                                {[styles.tabContentActive]: activeTab === ActiveTabChoices.TECH_DATA}
                            )}
                        >
                            <ul className={styles.attributesList}>
                                <li>
                                    <strong>Вес: </strong>
                                    {weight}
                                </li>
                                <li>
                                    <strong>Длина: </strong>
                                    {length}
                                </li>
                                <li>
                                    <strong>Ширина: </strong>
                                    {width}
                                </li>
                                <li>
                                    <strong>Высота: </strong>
                                    {height}
                                </li>
                                {attributes.map(({name, value, id}) => (
                                    <li key={id}>
                                        <strong>{name}: </strong>
                                        {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleTabClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            activeTab: parseInt(e.currentTarget.value, 10)
        });
    }

    private handleTitleClick(e: React.SyntheticEvent<HTMLDivElement>) {
        this.props.onTitleClick(this.props.product_id);
    }
}

export default class ProductsList extends React.Component<Props> {
    public render() {
        const {
            products,
            onProductTitleClick,
            openProducts,
        } = this.props;
        return (
            <div className={styles.className}>
                <div className={styles.headline}>
                    <div className={styles.w5}></div>
                    <div className={styles.w10}>Артикул</div>
                    <div className={styles.w45}>Наименование</div>
                    <div className={styles.w15}></div>
                    <div className={styles.w10}>Цена</div>
                    <div className={styles.w15}></div>
                </div>
                <div className={styles.listWrapper}>
                    {this.props.products.map(product =>
                        <ProductItem
                            key={product.product_id}
                            showDetails={openProducts.indexOf(product.product_id) !== -1}
                            onTitleClick={onProductTitleClick}
                            {...product}
                        />
                    )}
                </div>
            </div>
        );
    }
}