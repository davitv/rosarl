import { Dispatch } from 'redux';

import * as constants from './constants';

export interface ITogggleTimersSidebarAction {
    type: constants.TOGGLE_TIMERS_SIDEBAR;
}

export interface ToggleCalendarAction {
    type: constants.TOGGLE_CALENDAR;
}

export interface TogggleTasksSidebarAction {
    type: constants.TOGGLE_TASKS_SIDEBAR;
}

export interface OpenLoginModalAction {
    type: constants.OPEN_LOGIN_MODAL;
}

export interface CloseLoginModalAction {
    type: constants.CLOSE_LOGIN_MODAL;
}

export interface CloseResetPasswordModal {
    type: constants.CLOSE_RESET_PASSWORD_MODAL;
}

export interface OpenResetPasswordModal {
    type: constants.OPEN_RESET_PASSWORD_MODAL;
}

export interface RequestPasswordResetEmail {
    type: constants.REQUEST_PASSWORD_RESET_EMAIL;
    payload: string;
}

export interface ResubmitPasswordResetEmail {
    type: constants.RESUBMIT_PASSWORD_RESET_REQUEST;
}

export interface ResetPassword {
    type: constants.RESET_PASSWORD;
}

export type UIAction = (
    ITogggleTimersSidebarAction |
    CloseLoginModalAction |
    OpenLoginModalAction |
    CloseResetPasswordModal |
    OpenResetPasswordModal |
    RequestPasswordResetEmail |
    ResubmitPasswordResetEmail |
    ResetPassword |
    ToggleCalendarAction |
    TogggleTasksSidebarAction
);

export function toggleCalendar() {
    return (dispatch: Dispatch<ToggleCalendarAction>) => {
        dispatch({
            type: constants.TOGGLE_CALENDAR
        });
    }
}

export function toggleTimersSidebar() {
    return (dispatch: Dispatch<ITogggleTimersSidebarAction>) => {
        dispatch({
            type: constants.TOGGLE_TIMERS_SIDEBAR
        });
    }
}

export function toggleTasksSidebar() {
    return (dispatch: Dispatch<TogggleTasksSidebarAction>) => {
        dispatch({
            type: constants.TOGGLE_TASKS_SIDEBAR
        });
    }
}

export function openLoginModal() {
    return (dispatch: Dispatch<OpenLoginModalAction>) => {
        dispatch({
            type: constants.OPEN_LOGIN_MODAL
        });
    }
}

export function closeLoginModal() {
    return (dispatch: Dispatch<CloseLoginModalAction>) => {
        dispatch({
            type: constants.CLOSE_LOGIN_MODAL
        });
    }
}

export function openResetPasswordModal() {
    return (dispatch: Dispatch<OpenResetPasswordModal>) => {
        dispatch({
            type: constants.OPEN_RESET_PASSWORD_MODAL
        });
    }
}

export function closeResetPasswordModal() {
    return (dispatch: Dispatch<CloseResetPasswordModal>) => {
        dispatch({
            type: constants.CLOSE_RESET_PASSWORD_MODAL
        });
    }
}

export function requestPasswordReset(email: string) {
    return (dispatch: Dispatch<RequestPasswordResetEmail>) => {
        dispatch({
            type: constants.REQUEST_PASSWORD_RESET_EMAIL,
            payload: email
        });
    }
}

export function resubmitPasswordResetRequest() {
    return (dispatch: Dispatch<ResubmitPasswordResetEmail>) => {
        dispatch({
            type: constants.RESUBMIT_PASSWORD_RESET_REQUEST,
        });
    }
}

export function resetPassword() {
    return (dispatch: Dispatch<ResetPassword>) => {
        dispatch({
            type: constants.RESET_PASSWORD,
        });
    }
}