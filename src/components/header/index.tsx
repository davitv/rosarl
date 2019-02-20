import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as types from '../../types';

import { logout, AuthAction } from '../../auth/actions';

import Header from './Header';

export interface Props {
    cartItemsAmount: number;
}

const mapStateToProps = (state: types.AppState) => ({
    cartItemsAmount: Object.keys(state.cart.selectedItems).reduce((p, c) => p + state.cart.selectedItems[c], 0)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, any>) => ({});

export class HeaderContainer extends React.Component<Props> {

    public render() {
        return (
            <Header
                cartItemsAmount={this.props.cartItemsAmount}
            />
        );
    }
}

export default connect(mapStateToProps)(HeaderContainer);