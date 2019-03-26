import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../../types';
import {
    submitOrder,
    setOrderData,
    CartAction
} from '../../cart/actions';
import { OrderData, DeliveryData } from '../../cart/types';

import { setCart, UIAction } from '../../ui/actions';

import OrderForm, { FormValues } from './OrderForm';

const mapStateToProps = (state: types.AppState) => ({
    companyInfo: state.ui.companyInfo,
    deliveryData: state.cart.deliveryData,
    selectedProducts: Object.keys(state.cart.selectedItems).map((k) => ({
        id: parseInt(k, 10),
        amount: state.cart.selectedItems[k]
    }))
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction & UIAction>) => ({
    setCartState: (state: types.CartState) => dispatch(setCart(state)),
    submitOrder: (data: OrderData) => dispatch(submitOrder(data)),
    setOrderData: (data: OrderData) => dispatch(setOrderData(data)),
});

export interface Props {
    companyInfo: types.CompanyInfo;
    deliveryData: DeliveryData;
    selectedProducts: {id: number; amount: number}[];
    setOrderData: (data: OrderData) => void;
    setCartState: (state: types.CartState) => void;
    submitOrder: (data: Partial<OrderData>) => Promise<OrderData>;
}

export class OwnProps {
    intialValues?: FormValues;
    readOnly?: boolean;
}

export class OrderFormContainer extends React.Component<Props & OwnProps> {
    constructor(props: Props & OwnProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return (
            <OrderForm
                readOnly={!!this.props.readOnly}
                initialValues={this.props.intialValues}
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
                this.props.setCartState(types.CartState.result);
                this.props.setOrderData(res);
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormContainer);