import * as React from 'react';
import { connect } from 'react-redux';

import { OrderData } from '../../cart/types';
import * as types from '../../types';

import OrderResults from './OrderResults';

export interface Props {
    products: types.Product[];
    order: OrderData;
    productsListView?: boolean;
}

const mapStateToProps = (state: types.AppState) => ({
    products: state.products.products,
    order: state.cart.orderData,
});

export class OrderResultsContainer extends React.Component<Props> {
    public render() {
        return (
            <OrderResults
                productsListView={this.props.productsListView}
                id={this.props.order.id as number}
                first_name={this.props.order.first_name}
                last_name={this.props.order.last_name}
                patronymic={this.props.order.patronymic}
                products={this.props.order.products as any}
            />
        );
    }
}

export default connect(mapStateToProps)(OrderResultsContainer);