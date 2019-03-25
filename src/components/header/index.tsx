import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as types from '../../types';

import { logout, AuthAction } from '../../auth/actions';
import { getUserDetails } from '../../account/actions';
import { loadManufacturers, ManufacturersAction } from '../../manufacturers/actions';
import { toggleCart, loadCompanyInfo, UIAction } from '../../ui/actions';
import { CompanyInfo } from '../../ui/types';

import Header from './Header';

export interface Props {
    cartItemsAmount: number;
    isCartOpen: boolean;
    companyInfo: CompanyInfo;
    isAuthenticated: boolean;
    toggleCart: (isOpen: boolean) => void;
    loadCompanyInfo: () => Promise<any>;
    loadManufacturers: () => Promise<any>;
    getUserDetails: () => Promise<any>;
}

const mapStateToProps = (state: types.AppState) => ({
    cartItemsAmount: Object.keys(state.cart.selectedItems).reduce((p, c) => p + state.cart.selectedItems[c], 0),
    isCartOpen: state.ui.isCartOpen,
    isAuthenticated: !!state.auth.id,
    companyInfo: state.ui.companyInfo,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, UIAction & AuthAction>) => ({
    toggleCart: (isOpen: boolean) => {
        dispatch(toggleCart(isOpen))
    },
    loadManufacturers: () => dispatch(loadManufacturers()),
    loadCompanyInfo: () => dispatch(loadCompanyInfo()),
    getUserDetails: () => dispatch(getUserDetails()),
});

export class HeaderContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.toggleCart = this.toggleCart.bind(this);
        props.getUserDetails();
        props.loadManufacturers();
        props.loadCompanyInfo();
    }

    public render() {
        const {
            companyInfo: {
                about,
                payment,
                contacts,
            },
            isAuthenticated,
        } = this.props;

        return (
            <Header
                isAuthenticated={isAuthenticated}
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