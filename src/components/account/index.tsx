import * as React from 'react';
import { connect } from 'react-redux';

import * as types from '../../types';
import Account from './Account';

const mapStateToProps = ({userDetails}: types.AppState) => ({
    userDetails
});

export interface Props {
    userDetails: types.UserDetails;
}

export class AccountContainer extends React.Component<Props> {
    public render() {
        return <Account
            addresses={this.props.userDetails.addresses}
            orders={this.props.userDetails.orders}
        />;
    }
}

export default connect(mapStateToProps)(AccountContainer);