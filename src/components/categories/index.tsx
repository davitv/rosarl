import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { loadCategories, CategoriesAction } from '../../categories/actions';
import { toggleCategory, UIAction } from '../../ui/actions';
import { Category } from '../../categories/types';

import * as types from '../../types';

import Categories from './Categories';

const mapStateToProps = (state: types.AppState, {match: {params: {category}}}: RouteComponentProps<{category: string}>) => ({
    categories: state.categories,
    openCategories: state.ui.openCategories,
    selectedCategory: parseInt((state.router.location as any).pathname.split('/')[2], 10)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CategoriesAction & UIAction>) => ({
    load: () => dispatch(loadCategories()),
    toggleCategory: (categoryId: number) => dispatch(toggleCategory(categoryId)),
});

export interface Props {
    categories: Category[];
    openCategories: number[];
    selectedCategory: number;

    load: () => void;
    toggleCategory: (categoryId: number) => void;
}

export class CategoriesContainer extends React.Component<Props> {

    static defaultProps = {
        selectedCategory: 0
    }
    constructor(props: Props) {
        super(props);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    componentDidMount() {
        this.props.load();
    }

    public render() {
        return (
            <Categories
                openCategories={this.props.openCategories}
                categories={this.props.categories}
                selected={this.props.selectedCategory}

                onClick={this.handleCategoryClick}
            />
        );
    }

    private handleCategoryClick(categoryId: number) {
        this.props.toggleCategory(categoryId);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);