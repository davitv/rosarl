import * as React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const styles = require('./CartInput.css');

const loaderWhiteURL = require('../../assets/loader-white.png');
const loaderDarkURL = require('../../assets/loader-black.png');


export interface Props {
    amount: number;

    onIncrement: () => void;
    onDecrement: () => void;
    onAmountSet: (amount: number) => void;
}


export default class CartInput extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleIncrementButtonClick = this.handleIncrementButtonClick.bind(this);
        this.handleDecrementButtonClick = this.handleDecrementButtonClick.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    }

    public render() {
        const {
            amount
        } = this.props;

        const inCart = amount > 0;

        return (
            <div className={styles.className}>
                <div className={styles.inputWrapper}>
                    <input
                        onChange={this.handleInputChange}
                        onClick={this.handleInputClick}
                        value={inCart ? amount : ''}
                        type="text"
                        className={styles.input}
                    />
                    <button
                        onClick={this.handleIncrementButtonClick}
                        className={cn(
                            styles.btn,
                            styles.btnIncrement
                        )}
                    >
                         <Icon icon="chevron-up" />
                    </button>
                    <button
                        onClick={this.handleDecrementButtonClick}
                        className={cn(
                            styles.btn,
                            styles.btnDecrement
                        )}
                    >
                         <Icon icon="chevron-down" />
                    </button>
                </div>

                <button
                    onClick={this.handleAddButtonClick}
                    className={cn(
                        styles.btnAdd,
                        {[styles.btnAddActive]: inCart}
                    )}
                >
                    <img
                        src={inCart ? loaderWhiteURL : loaderDarkURL}
                        alt="Добавить в корзину"
                    />
                </button>
            </div>
        );
    }

    private handleIncrementButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onIncrement();
    }

    private handleDecrementButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onDecrement();
    }

    private handleAddButtonClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.amount === 0) {
            this.props.onIncrement();
        }
    }

    private handleInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
        if (!isNaN(parseInt(e.currentTarget.value, 10))) {
            this.props.onAmountSet(parseInt(e.currentTarget.value, 10));
        }
        if (e.currentTarget.value === '') {
            this.props.onAmountSet(0);
        }
    }
    private handleInputClick(e: React.SyntheticEvent<HTMLInputElement>) {
        e.stopPropagation();
    }
}