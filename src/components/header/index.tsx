import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as types from '../../types';

import { logout, AuthAction } from '../../auth/actions';
import { toggleCart, UIAction } from '../../ui/actions';

import Header from './Header';

export interface Props {
    cartItemsAmount: number;
    isCartOpen: boolean;
    toggleCart: (isOpen: boolean) => void;
}

const mapStateToProps = (state: types.AppState) => ({
    cartItemsAmount: Object.keys(state.cart.selectedItems).reduce((p, c) => p + state.cart.selectedItems[c], 0),
    isCartOpen: state.ui.isCartOpen,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, UIAction & AuthAction>) => ({
    toggleCart: (isOpen: boolean) => {
        dispatch(toggleCart(isOpen))
    }
});

export class HeaderContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.toggleCart = this.toggleCart.bind(this);
    }
    public render() {
        return (
            <Header
                onCartClick={this.toggleCart}
                cartItemsAmount={this.props.cartItemsAmount}
            />
        );
    }

    private toggleCart() {
        this.props.toggleCart(!this.props.isCartOpen);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);