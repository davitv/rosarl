import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';


import { requestPhoneCall, PhoneCallsAction, PhoneCallRequestData } from '../../phonecalls/actions';
import { setHeaderCallbackFormSubmitted } from '../../ui/actions';

import * as types from '../../types';

import CallbackForm, { FormValues } from './CallbackForm';
import CallbackFormAlert from '../callback-form-alert';

const mapStateToProps = (state: types.AppState) => ({
    isRequestDone: state.ui.isHeaderCallbackFormSubmitted
});

const mapDispatchToProps = (dispatch: ThunkDispatch<types.AppState, {}, PhoneCallsAction>) => ({
    requestCallback: (data: FormValues) => dispatch(requestPhoneCall(data)),
    setHeaderFormSubmitData: (submittedBy: string, phone: string) => dispatch(setHeaderCallbackFormSubmitted(submittedBy, phone)),
});

export interface Props {
    requestCallback: (data: FormValues) => Promise<PhoneCallRequestData>;
    setHeaderFormSubmitData: (submittedBy: string, phone: string) => void;
    isRequestDone: boolean;
}

export class CallbackFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    public render() {
        return  this.props.isRequestDone ?
            <CallbackFormAlert />
            :
            <CallbackForm
                onSubmit={this.handleFormSubmit}
            />;
    }

    private handleFormSubmit(values: FormValues) {
        return new Promise<void>((resolve, reject) => {
            this.props.requestCallback(values)
                        .catch(reject)
                        .then(() => {
                            resolve();
                            this.props.setHeaderFormSubmitData(values.name, values.phone);
                        });
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallbackFormContainer);