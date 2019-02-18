import * as React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../../types';

import { loadProducts, ProductsAction } from '../../products/actions';
import { Product } from '../../products/types';

import { toggleProduct, UIAction } from '../../ui/actions';

import ProductsList from './ProductsList';


const mapStateToProps = (state: types.AppState) => ({
    selectedCategory: parseInt((state.router.location as any).pathname.split('/')[2], 10),
    products: state.products.products,
    openProducts: state.ui.openProducts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, ProductsAction & UIAction>) => ({
    load: (categoryId: number) => {
        dispatch(loadProducts({category: categoryId}));
    },
    toggleProduct: (productId: number) => {
        dispatch(toggleProduct(productId));
    },
});

export interface Props {
    selectedCategory: number;
    products: Product[];
    openProducts: number[];

    load: (categoryId: number) => void;
    toggleProduct: (productId: number) => void;
}

export class ProductsListContainer extends React.Component<Props> {
    componentDidMount() {
        if (this.props.selectedCategory) {
            this.loadProducts();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.selectedCategory !== this.props.selectedCategory) {
            this.loadProducts();
        }
    }

    private loadProducts() {
        this.props.load(this.props.selectedCategory);
    }

    public render() {
        return (
            <ProductsList
                openProducts={this.props.openProducts}
                onProductTitleClick={this.props.toggleProduct}
                products={this.props.products}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer);