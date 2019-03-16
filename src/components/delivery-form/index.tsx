import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { isEmpty } from '../../utils/check';

import { setDeliveryFormValidity, setDeliveryFormData, CartAction } from '../../cart/actions';
import { DeliveryData } from '../../cart/types';
import { deliveryDataValidator } from '../../cart/validators';

import * as types from '../../types';

import DeliveryForm from './DeliveryForm';

const mapStateToProps = (state: types.AppState) => ({
    companyInfo: state.ui.companyInfo,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction>) => ({
    setValidity: (isValid: boolean) => dispatch(setDeliveryFormValidity(isValid)),
    setDeliveryData: (data: Partial<DeliveryData>) => dispatch(setDeliveryFormData(data)),
});


export interface Props {
    companyInfo: types.CompanyInfo;
    setValidity: (isValid: boolean) => void;
    setDeliveryData: (data: Partial<DeliveryData>) => void;
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
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryFormContainer);