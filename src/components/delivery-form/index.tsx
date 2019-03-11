import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { setDeliveryFormValidity, CartAction } from '../../cart/actions';
import * as types from '../../types';

import DeliveryForm, { FormValues } from './DeliveryForm';

const mapStateToProps = (state: types.AppState) => ({
    companyInfo: state.ui.companyInfo,
    isValid: state.cart.isDeliveryFormValid,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction>) => ({
    setValidity: (isValid: boolean) => dispatch(setDeliveryFormValidity(isValid)),
});


export interface Props {
    isValid: boolean;
    companyInfo: types.CompanyInfo;
    setValidity: (isValid: boolean) => void;
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
                warehouseAddress={this.props.companyInfo.contacts.warehouseAddress}
                warehouseImageURL={this.props.companyInfo.contacts.routeScheme}
                onSubmit={this.handleSubmit}
                onValidityChange={this.handleValidityChange}
            />
        );
    }

    private handleValidityChange(isValid: boolean) {
        if (isValid !== this.props.isValid) {
            this.props.setValidity(isValid);
        }
    }

    private handleSubmit(values: FormValues) {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryFormContainer);