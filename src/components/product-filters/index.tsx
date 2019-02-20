import * as React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../../types';

import {
    loadProducts,
    loadFilteringAttributes,
    ProductsAction
} from '../../products/actions';
import { Product, FilteringAttribute } from '../../products/types';
import { toggleFilters, UIAction } from '../../ui/actions';

import ProductFilters from './ProductFilters';


export interface OwnProps {
    onAttributeClick: (attributeId: number) => void;
    selectedFilters: number[];
}

const mapStateToProps = (state: types.AppState, ownProps: OwnProps) => ({
    selectedCategory: parseInt((state.router.location as any).pathname.split('/')[2], 10),
    attributes: state.products.filteringAttributes,
    isOpen: state.ui.isFilteringOpen,
    onAttributeClick: ownProps.onAttributeClick,
    selectedFilters: ownProps.selectedFilters,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, ProductsAction & UIAction>) => ({
    load: (categoryId: number) => {
        dispatch(loadFilteringAttributes(categoryId));
    },
    toggleFilters: (isOpen: boolean) => {
        dispatch(toggleFilters(isOpen));
    }
});

export interface Props {
    selectedCategory: number;
    attributes: FilteringAttribute[];
    isOpen: boolean;

    toggleFilters: (isOpen: boolean) => void;
    load: (categoryId: number) => void;
}

export class ProductsListContainer extends React.Component<Props & OwnProps> {
    constructor(props: Props & OwnProps) {
        super(props);
        this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    }
    componentDidMount() {
        if (this.props.selectedCategory) {
            this.load();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!isNaN(this.props.selectedCategory) && prevProps.selectedCategory !== this.props.selectedCategory) {
            this.load();
        }
    }

    private load() {
        this.props.load(this.props.selectedCategory);
    }

    public render() {
        return (
            <ProductFilters
                selectedFilters={this.props.selectedFilters}
                isOpen={this.props.isOpen}
                onButtonClick={this.handleToggleButtonClick}
                onAttributeClick={this.props.onAttributeClick}
                attributes={this.props.attributes}
            />
        );
    }

    private handleToggleButtonClick() {
        this.props.toggleFilters(!this.props.isOpen)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer);