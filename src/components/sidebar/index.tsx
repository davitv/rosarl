import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Route } from 'react-router-dom';
import * as types from '../../types';
import { loadCategories, CategoriesAction } from '../../categories/actions';

import Sidebar from './Sidebar';

const mapStateToProps = (state: types.AppState) => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, CategoriesAction>) => ({
    load: () => {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    },
});

export interface Props {
    load: () => Promise<void>;
}

export class SidebarContainer extends React.Component<Props> {

    componentDidMount() {
        this.props.load();
    }

    public render() {
        return (
            <Route>
            <Sidebar />
            </Route>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);