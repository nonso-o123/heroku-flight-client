import * as ActionTypes from '../ActionTypes'

export const airlinesReducer = (state = {
    airlinesLoading: true,
    errorMess: null,
    airlines: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.POPULAR_AIRLINES_LOADING:
            return { ...state, airlinesLoading: true, errorMess: null, airlines: action.payload }
        case ActionTypes.POPULAR_AIRLINES_FAILED:
            return { ...state, airlinesLoading: false, errorMess: action.payload }
        case ActionTypes.POPULAR_AIRLINES_SUCCESS:
            return { ...state, airlinesLoading: false, airlines: action.payload };
        default:
            return state;
    }
}