import * as ActionTypes from '../ActionTypes'

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.USER_SIGNIN_REQUEST:
            return { isLoading: true }
        case ActionTypes.USER_SIGNIN_FAILED:
            return { isLoading: false, error: action.payload }
        case ActionTypes.USER_SIGNIN_SUCCESS:
            return { isLoading: false, userInfo: action.payload };
        case ActionTypes.USER_SIGNIN_CLEAR:
            return { isLoading: false };
        default:
            return state;
    }
}
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.USER_REGISTER_REQUEST:
            return { isLoading: true }
        case ActionTypes.USER_REGISTER_FAILED:
            return { isLoading: false, error: action.payload }
        case ActionTypes.USER_REGISTER_SUCCESS:
            return { isLoading: false, userReg: action.payload };
        case ActionTypes.USER_REGISTER_CLEAR:
            return { isLoading: false };
        default:
            return state;
    }
}

export const userReducer = (state = { userData: [], isLoading: false }, action) => {
    switch (action.type) {
        case ActionTypes.USER_REQUEST_START:
            return { ...state, isLoading: true }
        case ActionTypes.USER_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.payload }
        case ActionTypes.USER_FETCH:
            return { ...state, isLoading: false, userData: action.payload };
        case ActionTypes.USER_DELETE:
            console.log("DELETE USER", action.payload.userId, state)
            return {
                ...state,
                isLoading: false,
                userData: state.userData.filter(ud => ud._id !== action.payload.userId)
            };

        case ActionTypes.USER_UPDATE:
            const index = state.userData.findIndex(u => u._id === action.payload.userId);
            const updatedUser = {
                ...state.userData[index],
                email: action.payload.field === "email" ? action.payload.value : state.userData[index].email,
                fName: action.payload.field === "name" ? action.payload.value.split(" ")[0] : state.userData[index].fName,
                lName: action.payload.field === "name" ?
                    (typeof action.payload.value.split(" ")[1] === "undefined" ? "" : action.payload.value.split(" ")[1])
                    : state.userData[index].lName,
                isAdmin: action.payload.field === "isAdmin" ? action.payload.value : state.userData[index].isAdmin
            }
            const updateUserArr = [...state.userData];
            updateUserArr[index] = updatedUser;
            if (action.payload.isUpdate) {
                return {
                    ...state,
                    isLoading: false
                };
            } else {
                return {
                    ...state,
                    isLoading: false,
                    userData: updateUserArr
                };
            }
        default:
            return state;
    }
}