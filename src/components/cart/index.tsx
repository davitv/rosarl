import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { CartProduct } from '../../cart/types';
import { loadCartProducts, setAmount, CartAction } from '../../cart/actions';
import { updateStorageItems } from '../../utils/fp';
import { Product as ProductInterface } from '../../products/types';

import * as types from '../../types';

import Cart from './Cart';

const mapStateToProps = (state: types.AppState) => ({
    isOpen: state.ui.isCartOpen,
    selectedProducts: state.cart.selectedItems,
    products: Object.keys(state.cart.selectedItems).map(k => {
        return state.products.products.filter(p => p.product_id == parseInt(k, 10))
    }).reduce((p, c) => p.concat(c), []).map(({product_id, images, name, price}) => ({
        product_id,
        name,
        price,
        images: images.map(img => img.image_url)
    })),
});


const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CartAction>) => ({
    loadProducts: (ids: number[]) => dispatch(loadCartProducts(ids)),
    removeFromCart: (productId: number) => dispatch(setAmount(productId, 0)),
});

export interface Props {
    isOpen: boolean;
    selectedProducts: {[key: string]: number};
    products: CartProduct[];
    removeFromCart: (productId: number) => void;
    loadProducts: (ids: number[]) => Promise<CartProduct[]>;
}

export interface State {
    products: CartProduct[];
}

export class CartContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        const ids = Object.keys(this.props.selectedProducts).map(k => parseInt(k, 10));
        this.props.loadProducts(ids).then((products: any) => {
            this.setState({products: products.results});
        });
    }

    public render() {
        const {
            isOpen,
            selectedProducts,
        } = this.props;

        const products: (CartProduct & {amount: number})[] = updateStorageItems(
            this.state.products, this.props.products, 'product_id'
        ).map(p => ({
            ...p,
            amount: selectedProducts[p.product_id] ? selectedProducts[p.product_id] : 0
        })).filter(p => !!p.amount);

        return (
            <Cart
                onRemoveClick={this.props.removeFromCart}
                products={products}
                isOpen={isOpen}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);