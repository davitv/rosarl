import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import { loadCartProducts, CartAction } from '../../cart/actions';

import * as types from '../../types';

import Print from '../print';

import ProductPrint from './ProductPrint';


export interface OwnProps extends RouteComponentProps<{product: string}> {

}

export interface Props {
    products: types.Product[];
    productId: number;
    load: () => Promise<any>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction>, {match: {params}, ...rest}: OwnProps) => ({
    load: () => {
        return dispatch(loadCartProducts([parseInt(params.product, 10)]));
    }
});

const mapStateToProps = (state: types.AppState, {match: {params: {product}}}: OwnProps) => ({
    productId: parseInt(product, 10),
    products: state.products.products.filter(({product_id}) => product_id === parseInt(product, 10))
});

export class ProductPrintContainer extends React.Component<Props & OwnProps> {
    public componentDidMount() {
        print();
    }

    public componentWillMount() {
        this.props.load();
    }
    public render() {
        const [ product ] = this.props.products;

        return (
            <Print>
                <ProductPrint product={product} />
            </Print>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductPrintContainer);