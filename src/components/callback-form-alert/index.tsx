import * as React from 'react';

import { connect } from 'react-redux';

import * as types from '../../types';

import CallbackFormAlert from './CallbackFormAlert';

const mapStateToProps = (state: types.AppState) => ({
    submittedBy: state.ui.headerCallbackFormSubmittedBy,
    phone: state.ui.headerCallbackFormSubmittedPhone,
});

export default connect(mapStateToProps)(CallbackFormAlert);