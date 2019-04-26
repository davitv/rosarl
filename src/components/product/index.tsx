import * as React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { increment, decrement, setAmount, CartAction } from '../../cart/actions';

import * as types from '../../types';

import Product, { Props as ProductProps } from './Product';


export interface Props extends ProductProps {
    cartAmount: number;
    onCartIncrementClick: () => void;
    onCartDecrementClick: () => void;
    onCartAmountSet: (amount: number) => void;
}


const mapStateToProps = (state: types.AppState, ownProps: {product_id: number}) => ({
    cartAmount: state.cart.selectedItems[ownProps.product_id] === undefined ? 0 : state.cart.selectedItems[ownProps.product_id]
});


const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction>, ownProps: {product_id: number}) => ({
    onCartIncrementClick: () => dispatch(increment(ownProps.product_id)),
    onCartDecrementClick: () => dispatch(decrement(ownProps.product_id)),
    onCartAmountSet: (amount: number) => dispatch(setAmount(ownProps.product_id, amount)),
});


export class ProductContainer extends React.Component<Props> {
    public render() {
        const {
            onCartDecrementClick,
            onCartIncrementClick,
            onCartAmountSet,
            cartAmount,
        } = this.props;

        return (
            <Product
                cartAmount={cartAmount}
                onCartIncrementClick={onCartIncrementClick}
                onCartDecrementClick={onCartDecrementClick}
                onCartAmountSet={onCartAmountSet}
                {...this.props}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);