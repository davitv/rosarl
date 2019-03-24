import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../../types';
import { submitOrder, CartAction } from '../../cart/actions';
import { OrderData, DeliveryData } from '../../cart/types';

import OrderForm, { FormValues } from './OrderForm';

const mapStateToProps = (state: types.AppState) => ({
    companyInfo: state.ui.companyInfo,
    deliveryData: state.cart.deliveryData,
    selectedProducts: Object.keys(state.cart.selectedItems).map((k) => ({
        id: parseInt(k, 10),
        amount: state.cart.selectedItems[k]
    }))
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction>) => ({
    submitOrder: (data: OrderData) => dispatch(submitOrder(data)),
});

export interface Props {
    companyInfo: types.CompanyInfo;
    deliveryData: DeliveryData;
    selectedProducts: {id: number; amount: number}[];
    submitOrder: (data: OrderData) => Promise<OrderData>;
}


export class OrderFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return (
            <OrderForm
                warehouseAddress={this.props.companyInfo.contacts.warehouseAddress}
                warehouseImageURL={this.props.companyInfo.contacts.routeScheme}
                onSubmit={this.handleSubmit}
            />
        );
    }

    private handleSubmit(values: FormValues) {
        return new Promise<OrderData>((resolve, reject) => {
            const data = {
                ...values,
                delivery_method: 0,
                products: this.props.selectedProducts,
                delivery: this.props.deliveryData,
            };
            this.props.submitOrder(data).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormContainer);