import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { isEmpty } from '../../utils/check';

import {
    setDeliveryFormValidity,
    setDeliveryFormData,
    CartAction
} from '../../cart/actions';
import { DeliveryData } from '../../cart/types';
import { deliveryDataValidator } from '../../cart/validators';

import {
    setCart,
    UIAction
} from '../../ui/actions';

import * as types from '../../types';

import DeliveryForm from './DeliveryForm';

const mapStateToProps = (state: types.AppState) => ({
    companyInfo: state.ui.companyInfo,
    initialDeliveryData: state.cart.deliveryData,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction & UIAction>) => ({
    setValidity: (isValid: boolean) => dispatch(setDeliveryFormValidity(isValid)),
    setDeliveryData: (data: Partial<DeliveryData>) => dispatch(setDeliveryFormData(data)),
    setCartState: (newState: types.CartState) => dispatch(setCart(newState)),
});


export interface Props {
    companyInfo: types.CompanyInfo;
    setCartState: (newState: types.CartState) => void;
    setValidity: (isValid: boolean) => void;
    setDeliveryData: (data: Partial<DeliveryData>) => void;
    initialDeliveryData: DeliveryData;
}


export class DeliveryFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidityChange = this.handleValidityChange.bind(this);
    }

    public render() {
        return (
            <DeliveryForm
                initialValues={this.props.initialDeliveryData}
                warehouseAddress={this.props.companyInfo.contacts.warehouseAddress}
                warehouseImageURL={this.props.companyInfo.contacts.routeScheme}
                onSubmit={this.handleSubmit}
                onValuesChange={this.handleValidityChange}
            />
        );
    }

    private handleValidityChange(data: DeliveryData) {
        this.props.setDeliveryData(data);
    }

    private handleSubmit(values: DeliveryData) {
        return new Promise<void>((resolve, reject) => {
            resolve();
            this.props.setCartState(types.CartState.form);
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryFormContainer);