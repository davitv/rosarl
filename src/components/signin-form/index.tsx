import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';


import { requestPhoneCall, PhoneCallsAction, PhoneCallRequestData } from '../../phonecalls/actions';
import { setHeaderCallbackFormSubmitted } from '../../ui/actions';
import { login, AuthAction } from '../../auth/actions';

import * as types from '../../types';

import SigninForm, { FormValues } from './SigninForm';

const mapStateToProps = (state: types.AppState) => ({
    isRequestDone: state.ui.isHeaderCallbackFormSubmitted
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, AuthAction>) => ({
    setHeaderFormSubmitData: (submittedBy: string, phone: string) => dispatch(setHeaderCallbackFormSubmitted(submittedBy, phone)),
    login: (data: {username: string, password: string}) => dispatch(login(data)),
});

export interface Props {
    setHeaderFormSubmitData: (submittedBy: string, phone: string) => void;
    login: (data: {username: string, password: string}) => Promise<any>;
    isRequestDone: boolean;
}

export class CallbackFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    public render() {
        return  <SigninForm
            onSubmit={this.handleFormSubmit}
        />;
    }

    private handleFormSubmit(values: FormValues) {
        return new Promise<void>((resolve, reject) => {
            this.props.login(values).then(res => resolve(res)).catch(reject);
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallbackFormContainer);