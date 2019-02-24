import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as types from '../../types';

import { logout, AuthAction } from '../../auth/actions';
import { toggleCart, loadCompanyInfo, UIAction } from '../../ui/actions';
import { CompanyInfo } from '../../ui/types';

import Header from './Header';

export interface Props {
    cartItemsAmount: number;
    isCartOpen: boolean;
    companyInfo: CompanyInfo;

    toggleCart: (isOpen: boolean) => void;
    loadCompanyInfo: () => Promise<any>;
}

const mapStateToProps = (state: types.AppState) => ({
    cartItemsAmount: Object.keys(state.cart.selectedItems).reduce((p, c) => p + state.cart.selectedItems[c], 0),
    isCartOpen: state.ui.isCartOpen,
    companyInfo: state.ui.companyInfo,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, UIAction & AuthAction>) => ({
    toggleCart: (isOpen: boolean) => {
        dispatch(toggleCart(isOpen))
    },
    loadCompanyInfo: () => dispatch(loadCompanyInfo()),
});

export class HeaderContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.toggleCart = this.toggleCart.bind(this);

        props.loadCompanyInfo();
    }

    public render() {
        const {
            companyInfo: {
                about,
                payment,
                contacts,
            }
        } = this.props;

        return (
            <Header
                paymentText={payment.text}
                paymentImageURL={payment.image_url}
                aboutText={about}
                contacts={contacts}
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