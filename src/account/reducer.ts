import { AccountAction } from './actions';
import * as constants from './constants';
import * as types from './types';


export const getDefaultUserDetails = () => ({
    orders: [],
    addresses: []
});


export const userDetails = (state: types.UserDetails = getDefaultUserDetails(), action: AccountAction) => {
    switch (action.type) {
        case constants.SET_USER_DETAILS:
            return action.payload;
        default:
            return state;
    }
}

export default userDetails;