import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { setAmount, increment, decrement, CartAction } from '../../cart/actions';

import * as types from '../../types';

import CartInput from './CartInput';

export interface OwnProps {
    productId: number;
}

export interface Props extends OwnProps {
    amount: number;

    increment: () => void;
    decrement: () => void;
    setAmount: (amount: number) => void;
}

const mapStateToProps = ({cart: {selectedItems}}: types.AppState, {productId}: OwnProps) => ({
    amount: selectedItems[productId] ? selectedItems[productId] : 0
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction>, {productId}: OwnProps) => ({
    increment: () => dispatch(increment(productId)),
    decrement: () => dispatch(decrement(productId)),
    setAmount: (amount: number) => dispatch(setAmount(productId, amount)),
});

export class CartInputContainer extends React.Component<Props> {
    public render() {
        return (
            <CartInput
                amount={this.props.amount}
                onIncrement={this.props.increment}
                onDecrement={this.props.decrement}
                onAmountSet={this.props.setAmount}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartInputContainer);