import * as React from 'react';
import * as queryString from 'query-string';

import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../../types';

import { loadProducts, resetProducts, ProductsAction } from '../../products/actions';
import { Product } from '../../products/types';

import { toggleProduct, UIAction } from '../../ui/actions';
import { addOrRemove } from '../../utils/fp';

import ProductsList from './ProductsList';

export interface OwnProps extends RouteComponentProps<{category: string}> {

}

export interface Props {
    selectedCategory: number;
    products: Product[];
    openProducts: number[];
    searchKeyword: string | undefined;
    load: (filters?: string) => Promise<any>;
    resetList: () => void;
    loadNextPage: (path: string) => Promise<any>;
    toggleProduct: (productId: number) => void;
}

const mapStateToProps = (state: types.AppState, {match: {params}, ...rest}: OwnProps) => {
    const urlQuery = queryString.parse(rest.location.search);
    const searchKeyword = urlQuery['q'] !== undefined ? (urlQuery['q'] as string) : undefined;

    return {
        searchKeyword,
        selectedCategory: parseInt(params.category, 10),
        products: state.products.products,
        openProducts: state.ui.openProducts,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, ProductsAction & UIAction>, {match: {params}, ...rest}: OwnProps) => ({
    load: (filters?: string) => {
        let category: number | undefined = parseInt(params.category, 10);
        if (isNaN(category)) {
            category = undefined;
        }
        const urlQuery = queryString.parse(rest.location.search);
        const searchQuery: Partial<{
            category: number;
            attributes: string;
            q: string
        }> = {
            attributes: filters,
            q: urlQuery['q'] !== undefined ? (urlQuery['q'] as string) : undefined,
            category
        };

        return dispatch(loadProducts(searchQuery));
    },
    resetList: () => dispatch(resetProducts()),
    loadNextPage: (path: string) => {
        return dispatch(loadProducts(undefined, path));
    },
    toggleProduct: (productId: number) => {
        dispatch(toggleProduct(productId));
    },
});


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
        this.props.resetList();
        this.loadProducts();
    }

    componentDidUpdate(prevProps: Props) {
        if (!isNaN(this.props.selectedCategory) && prevProps.selectedCategory !== this.props.selectedCategory) {
            this.props.resetList();
            this.setState({selectedFilters: []}, this.loadProducts);
        }
        else if (this.props.searchKeyword !== prevProps.searchKeyword) {
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
            this.props.load.bind(this, filters)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer));