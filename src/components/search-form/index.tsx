import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as H from 'history';
import { ThunkDispatch } from 'redux-thunk';
import * as types from '../../types';
import { loadProducts, resetProducts, ProductsAction } from '../../products/actions';

import SearchForm, { FormValues } from './SearchForm';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, ProductsAction>) => ({
    searchProducts: (keyword: string) => {
        dispatch(resetProducts());
        return dispatch(loadProducts({q: keyword}));
    },
});

export interface Props extends RouteComponentProps {
    searchProducts: (keyword: string) => Promise<any[]>;
}

export class SearchFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    public render() {
        return (
            <SearchForm
                onSubmit={this.handleFormSubmit}
            />
        );
    }

    private handleFormSubmit(values: FormValues) {
        return new Promise<void>((resolve, reject) => {
            this.props.history.push('/');
            this.props.searchProducts(values.keyword).then(() => resolve()).catch(reject);
        });
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer));