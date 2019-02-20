import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as H from 'history';
import * as queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import * as types from '../../types';
import { loadProducts, resetProducts, ProductsAction } from '../../products/actions';

import SearchForm, { FormValues } from './SearchForm';

const mapStateToProps = (state: types.AppState, {location: {search}}: RouteComponentProps) => {
    const urlQuery = queryString.parse(search);
    return {
        q: urlQuery['q'] !== undefined ? (urlQuery['q'] as string) : ''
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, ProductsAction>) => ({
    searchProducts: (keyword: string) => {
        dispatch(resetProducts());
        return dispatch(loadProducts({q: keyword}));
    },
});

export interface Props extends RouteComponentProps {
    searchProducts: (keyword: string) => Promise<any[]>;
    q: string;
}

export class SearchFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    public render() {
        return (
            <SearchForm
                initialValues={{
                    keyword: this.props.q
                }}
                onSubmit={this.handleFormSubmit}
            />
        );
    }

    private handleFormSubmit(values: FormValues) {
        return new Promise<void>((resolve, reject) => {
            this.props.history.push('/catalogue/?q=' + values.keyword);
        });
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer));