import { AuthAction } from './actions';
import * as constants from './constants';
import * as types from './types';

export const auth = (state: types.IAuth = {id: 0, token: ''}, action: AuthAction) => {
    switch (action.type) {
        case constants.SET_AUTH_CREDENTIALS:
            return {
                id: action.payload.id,
                token: action.payload.token
            };
        case constants.LOG_OUT:
            return {
                id: 0,
                token: ''
            };
        default:
            return state;
    }
}

export default auth;