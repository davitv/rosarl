import * as React from 'react';
import cn from 'classnames';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Product } from '../../products/types';
import { IMAGES_PATH_URL } from '../../products/constants';

import CartInput from '../cart-input';

const styles = require('./Product.css');

const loaderWhiteURL = require('../../assets/loader-white.png');
const loaderDarkURL = require('../../assets/loader-black.png');

export enum ActiveTabChoices {
    DESCRIPTION = 1,
    TECH_DATA
}

export interface State {
    activeTab: ActiveTabChoices;
}

export interface Props extends Product {
    showDetails: boolean;
    selectedAttributes: number[];
    cartAmount: number;
    onCartIncrementClick: () => void;
    onCartDecrementClick: () => void;
    onCartAmountSet: (amount: number) => void;
    onTitleClick: (productId: number) => void;
    onAttributeClick: (attributeId: number) => void;
}

export default class ProductComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: ActiveTabChoices.DESCRIPTION
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleAttributeButtonClick = this.handleAttributeButtonClick.bind(this);
        this.handleIncrementButtonClick = this.handleIncrementButtonClick.bind(this);
        this.handleDecrementButtonClick = this.handleDecrementButtonClick.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
    }

    public render() {
        const {
            product_id,
            article,
            name,
            description,
            price,
            weight,
            length,
            width,
            height,
            attributes,
            selectedAttributes,
            showDetails,
            cartAmount,
            images
        } = this.props;

        const {
            activeTab
        } = this.state;

        const inCart = cartAmount > 0;

        return (
            <div
                className={cn(
                    styles.className,
                    {
                        [styles.open]: showDetails,
                        [styles.inCart]: inCart,
                    }
                )}
            >
                <div
                    className={styles.title}
                    onClick={this.handleTitleClick}
                >
                    <div className={styles.w5}>
                        <img
                            className={styles.photo}
                            src={images.length ? IMAGES_PATH_URL + images[0].image_url : undefined}
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
                            styles.attributesList,
                        )}
                    >
                        {!showDetails &&
                            <Icon icon="search" />
                        }
                        {showDetails &&
                            attributes.map(({id, name, value}) =>
                                <button
                                    key={id}
                                    className={cn(
                                        styles.attribute,
                                        {[styles.attributeSelected]: selectedAttributes.indexOf(id) !== -1}
                                    )}
                                    value={id}
                                    onClick={this.handleAttributeButtonClick}
                                >
                                    {value}
                                </button>
                            )
                        }
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
                        <CartInput productId={product_id} />
                    </div>
                </div>

                <div
                    className={cn(
                        styles.details,
                        {[styles.detailsShown]: showDetails}
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
                            <ul className={styles.propsList}>
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

    private handleAttributeButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onAttributeClick(
            parseInt(e.currentTarget.value, 10)
        );
    }

    private handleIncrementButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onCartIncrementClick();
    }

    private handleDecrementButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onCartDecrementClick();
    }

    private handleAddButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.cartAmount === 0) {
            this.props.onCartIncrementClick();
        }
    }

    private handleInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
        if (!isNaN(parseInt(e.currentTarget.value, 10))) {
            this.props.onCartAmountSet(parseInt(e.currentTarget.value, 10));
        }
        if (e.currentTarget.value === '') {
            this.props.onCartAmountSet(0);
        }
    }
    private handleInputClick(e: React.SyntheticEvent<HTMLInputElement>) {
        e.stopPropagation();
    }
}
