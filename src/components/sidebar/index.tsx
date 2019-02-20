import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
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
}

export class SidebarContainer extends React.Component<Props> {

    public render() {
        return (
            <Sidebar />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);