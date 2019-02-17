import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { loadCategories, CategoriesAction } from '../../categories/actions';
import { Category } from '../../categories/types';

import * as types from '../../types';

import Categories from './Categories';

const mapStateToProps = (state: types.AppState) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CategoriesAction>) => ({
    load: () => dispatch(loadCategories()),
});

export interface Props {
    categories: Category[];
    load: () => void;
}

export class CategoriesContainer extends React.Component<Props> {
    componentDidMount() {
        this.props.load();
    }

    public render() {
        return (
            <Categories categories={this.props.categories} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);