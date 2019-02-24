import * as React from 'react';
import { connect } from 'react-redux';

import * as types from '../../types';

import DeliveryForm, { FormValues } from './DeliveryForm';

const mapStateToProps = (state: types.AppState) => ({
    companyInfo: state.ui.companyInfo
});


export interface Props {
    companyInfo: types.CompanyInfo;
}


export class DeliveryFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public render() {
        return (
            <DeliveryForm
                warehouseAddress={this.props.companyInfo.contacts.warehouseAddress}
                warehouseImageURL={this.props.companyInfo.contacts.routeScheme}
                onSubmit={this.handleSubmit}
            />
        );
    }

    private handleSubmit(values: FormValues) {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
}

export default connect(mapStateToProps)(DeliveryFormContainer);