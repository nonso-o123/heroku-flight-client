import * as ActionTypes from '../ActionTypes'

export const contactUsReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.CONTACT_US_REQUEST:
            return { isLoading: true }
        case ActionTypes.CONTACT_US_FAILED:
            return { isLoading: false, error: action.payload }
        case ActionTypes.CONTACT_US_SUCCESS:
            return { isLoading: false, contactUsMessage: action.payload };
        default:
            return state;
    }
}