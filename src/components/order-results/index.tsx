import * as React from 'react';
import { connect } from 'react-redux';

import { OrderData } from '../../cart/types';
import * as types from '../../types';

import OrderResults from './OrderResults';

export interface Props {
    products: types.Product[];
    order: OrderData;
}

const mapStateToProps = (state: types.AppState) => ({
    products: state.products.products,
    order: state.cart.orderData,
});

const defaultProductData = {
    product_id: 0,
    name: '',
    amount: 0,
    article: '',
    description: '',
    product_s_desc: '',
    price: 0,
    width: 0,
    height: 0,
    length: 0,
    weight: 0,

    product_full_image: '',
    product_thumb_image: '',
    images: [],
    attributes: [],
}

export class OrderResultsContainer extends React.Component<Props> {
    public render() {

        return (
            <OrderResults
                order={this.props.order}
            />
        );
    }
}

export default connect(mapStateToProps)(OrderResultsContainer);