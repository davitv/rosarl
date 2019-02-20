import * as React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../../types';

import { loadProducts, resetProducts, ProductsAction } from '../../products/actions';
import { Product } from '../../products/types';

import { toggleProduct, UIAction } from '../../ui/actions';
import { addOrRemove } from '../../utils/fp';

import ProductsList from './ProductsList';


const mapStateToProps = (state: types.AppState) => ({
    selectedCategory: parseInt((state.router.location as any).pathname.split('/')[2], 10),
    products: state.products.products,
    openProducts: state.ui.openProducts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, ProductsAction & UIAction>) => ({
    load: (categoryId: number, filters?: string) => {
        return dispatch(loadProducts({category: categoryId, attributes: filters}));
    },
    resetList: () => dispatch(resetProducts()),
    loadNextPage: (path: string) => {
        return dispatch(loadProducts(undefined, path));
    },
    toggleProduct: (productId: number) => {
        dispatch(toggleProduct(productId));
    },
});

export interface Props {
    selectedCategory: number;
    products: Product[];
    openProducts: number[];

    load: (categoryId: number, filters?: string) => Promise<any>;
    resetList: () => void;
    loadNextPage: (path: string) => Promise<any>;
    toggleProduct: (productId: number) => void;
}

export interface State {
    selectedFilters: number[];
    nextPage: string | null;
    isLoading: boolean;
}

export class ProductsListContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedFilters: [],
            isLoading: false,
            nextPage: null,
        };

        this.handleFilterSelect = this.handleFilterSelect.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidMount() {
        if (this.props.selectedCategory) {
            this.loadProducts();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!isNaN(this.props.selectedCategory) && prevProps.selectedCategory !== this.props.selectedCategory) {
            this.props.resetList();
            this.setState({selectedFilters: []}, this.loadProducts);
        }
    }

    private loadProducts(nextPage: boolean = false) {
        this.setLoading(true);

        const {
            selectedFilters
        } = this.state;
        const filters = selectedFilters.length ? selectedFilters.join(',') : undefined;
        const func = nextPage ?
            this.props.loadNextPage.bind(this, this.state.nextPage)
            :
            this.props.load.bind(this, this.props.selectedCategory, filters)
        ;
        func().then((res: any) => {
            this.setState({
                nextPage: res.next
            });
            this.setLoading(false);
        });
    }

    public render() {
        const selectedFilters = this.state.selectedFilters;
        const renderProducts = this.props.products.filter(({attributes}) => {
            if (!selectedFilters.length) {
                return true;
            }
            const vals = attributes.map(({id}) => id);
            return vals.filter(v => selectedFilters.indexOf(v) !== -1).length > 0;
        });

        return (
            <ProductsList
                onBottomScroll={this.loadNextPage}
                isLoading={this.state.isLoading}
                products={renderProducts}
                selectedFilters={this.state.selectedFilters}
                onAttributeClick={this.handleFilterSelect}
                openProducts={this.props.openProducts}
                onProductTitleClick={this.props.toggleProduct}
            />
        );
    }

    private handleFilterSelect(filterId: number) {
        this.toggleFilter(filterId);
    }

    private setLoading(isLoading: boolean) {
        this.setState({
            isLoading
        });
    }

    private loadNextPage() {
        if (this.state.nextPage !== null && !this.state.isLoading) {
            this.loadProducts(true);
        }
    }

    private toggleFilter(filterId: number) {
        this.setState({
            selectedFilters: addOrRemove(this.state.selectedFilters, filterId)
        }, () => {
            this.loadProducts();
        });
    }

    private resetFilters() {
        this.setState({selectedFilters: []});
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer);