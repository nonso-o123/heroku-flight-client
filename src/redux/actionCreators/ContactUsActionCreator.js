import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl'



//SEND MESSAGE 
export const contactUsMessage = (email, c_message) => async (dispatch) => {

    try {
        dispatch({ type: ActionTypes.CONTACT_US_REQUEST, payload: { email, c_message } })
        console.log("success")
        const { data } = await axios.post(`${baseUrl}api/contactus/sendmessage`, { email, c_message })

        dispatch({ type: ActionTypes.CONTACT_US_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ActionTypes.CONTACT_US_FAILED, payload: error.message })
        console.log(error)
    }
}

//FETCH MESSAGES
export const fetchMessages = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.FETCH_MESSAGE_REQ, payload: {} })
        const { data } = await axios.get(`${baseUrl}api/contactus`)
        dispatch({ type: ActionTypes.FETCH_MESSAGE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ActionTypes.FETCH_MESSAGE_FAILED, payload: error.message })
    }
}