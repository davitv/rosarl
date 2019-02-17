
import * as types from './types';
import * as constants from './constants';

import { UIAction } from './actions';

const getDefaultState = (): types.UIState => ({
    isTimersSidebarOpen: true,
    isLoginModalOpen: false,
    isCalendarShown: false,
    isResetPasswordModalOpen: false,
    passwordResetRequestEmail: '',
    isPasswordBeenReset: false,
    isTasksSidebarOpen: false
});

export const reducer = (state: types.UIState = getDefaultState(), action: UIAction) => {
    switch (action.type) {
        case constants.TOGGLE_CALENDAR:
            return {
                ...state,
                isCalendarShown: !state.isCalendarShown,
            }
        case constants.TOGGLE_TIMERS_SIDEBAR:
            return {
                ...state,
                isTimersSidebarOpen: !state.isTimersSidebarOpen,
                isTasksSidebarOpen: !state.isTimersSidebarOpen ? false : state.isTasksSidebarOpen,
            }
        case constants.TOGGLE_TASKS_SIDEBAR:
            return {
                ...state,
                isTasksSidebarOpen: !state.isTasksSidebarOpen,
                isTimersSidebarOpen: !state.isTasksSidebarOpen ? false : state.isTimersSidebarOpen,
            }
        case constants.OPEN_LOGIN_MODAL:
            return {...state, isLoginModalOpen: true};
        case constants.CLOSE_LOGIN_MODAL:
            return {...state, isLoginModalOpen: false};
        case constants.OPEN_RESET_PASSWORD_MODAL:
            return {...state, isResetPasswordModalOpen: true};
        case constants.CLOSE_RESET_PASSWORD_MODAL:
            return {...state, isResetPasswordModalOpen: false};
        case constants.REQUEST_PASSWORD_RESET_EMAIL:
            return {...state, passwordResetRequestEmail: action.payload};
        case constants.RESUBMIT_PASSWORD_RESET_REQUEST:
            return {...state, passwordResetRequestEmail: ''};
        case constants.RESET_PASSWORD:
            return {...state, isPasswordBeenReset: true};
        default:
            return state;
    }
}

export default reducer;