import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import * as types from '../../types';

import { logout, AuthAction } from '../../auth/actions';
import { openLoginModal, closeLoginModal, openResetPasswordModal } from '../../ui/actions';

import Header from './Header';

export class HeaderContainer extends React.Component {

    public render() {
        return (
            <Header />
        );
    }
}

export default connect()(HeaderContainer);