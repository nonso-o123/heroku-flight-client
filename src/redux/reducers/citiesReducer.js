import * as ActionTypes from '../ActionTypes'

export const citiesReducer = (state = {
    isLoading: true,
    errMess: null,
    cities: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.POPULARCITIES_LOADING:
            return { ...state, isLoading: true, errMess: null, cities: action.payload }
        case ActionTypes.POPULARCITIES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload }
        case ActionTypes.POPULARCITIES_SUCCESS:
            return { ...state, isLoading: false, cities: action.payload };
        default:
            return state;
    }
}