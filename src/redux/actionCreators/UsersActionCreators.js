import axios from 'axios';
import Cookie from 'js-cookie'
import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl'

//SIGNIN USERS

export const signinUser = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: ActionTypes.USER_SIGNIN_REQUEST, payload: { email, password } })
        const { data } = await axios.post(`${baseUrl}api/users/signin`, { email, password })
        console.log("success")
        dispatch({ type: ActionTypes.USER_SIGNIN_SUCCESS, payload: data })
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: ActionTypes.USER_SIGNIN_FAILED, payload: error.message })
        // console.log(error)
    }
}

//REGISTER  USERS
export const registerUser = (fName, lName, email, password) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.USER_REGISTER_REQUEST, payload: { fName, lName, email, password } })
        const { data } = await axios.post(`${baseUrl}api/users/register`, { fName, lName, email, password })
        console.log("success")
        dispatch({ type: ActionTypes.USER_REGISTER_SUCCESS, payload: data })
        Cookie.set('userReg', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: ActionTypes.USER_REGISTER_FAILED, payload: error.message })
        // console.log(error)
    }
}

export const logoutUser = () => async dispatch => {
    try {
        dispatch({ type: ActionTypes.USER_SIGNIN_CLEAR })
        dispatch({ type: ActionTypes.USER_REGISTER_CLEAR })
        // const { data } = await axios.get("api/users/logout")
    } catch (error) { }
}

//FETCH USERS
export const fetchUser = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.USER_REQUEST_START, payload: {} })
        const { data } = await axios.get(`${baseUrl}api/users`)
        dispatch({ type: ActionTypes.USER_FETCH, payload: data })
    } catch (error) {
        dispatch({ type: ActionTypes.USER_REQUEST_FAILED, payload: error.message })
    }
}

//DELETE USERS
export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.USER_REQUEST_START, payload: {} })
        const { data } = await axios.get(`${baseUrl}api/users/` + userId)
        console.log(data)
        dispatch({ type: ActionTypes.USER_DELETE, payload: data })
    } catch (error) {
        dispatch({ type: ActionTypes.USER_REQUEST_FAILED, payload: error.message })
    }
}

//UPDATE USERS
export const updateUser = (field, value, userId, data, shouldPersist = false) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.USER_REQUEST_START, payload: {} })
        if (shouldPersist) {
            await axios.put(`${baseUrl}api/users/` + data._id, data);
            dispatch({ type: ActionTypes.USER_UPDATE, payload: { isUpdate: true } })
        } else {
            console.log("In ACTION", value)
            dispatch({ type: ActionTypes.USER_UPDATE, payload: { field, value, userId } })
        }
    } catch (error) {
        dispatch({ type: ActionTypes.USER_REQUEST_FAILED, payload: error.message })
    }
}



// export const signinUser = (email, password) => dispatch => {
//     const user = {
//         email: email,
//         password: password
//     }
//     return fetch(baseUrl + 'api/users/signin', {
//         method: 'POST',
//         mode: 'no-cors',
//         body: JSON.stringify(user),
//         credentials: 'same-origin'
//     })
//         .then(response => {
//             if (response.ok) {
//                 console.log("success")
//                 return response
//             }
//             else {
//                 let error = new Error(`Error ${response.status}: ${response.statusText}`)
//                 error.response = response
//                 throw error
//             }
//         }, error => {
//             let errmess = new Error(error.message)
//             throw errmess
//         })
//         .then(response => response.json())
//         .then(usr => dispatch(userSigninSuccess(usr)))
//         .catch(error => dispatch(userSigninFailed(error.message)))
// }

// export const userSigninFailed = errMess => ({
//     type: ActionTypes.USER_SIGNIN_FAILED,
//     payload: errMess,
// })

// export const userSigninSuccess = user => ({
//     type: ActionTypes.USER_SIGNIN_SUCCESS,
//     payload: user,
// })
