import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl'


//POPULAR AIRLINES... 
export const fetchAirlines = () => async (dispatch) => {
    console.log(baseUrl)
    return fetch(`${baseUrl}api/airlines`)
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`)
                error.response = response
                throw error
            }
        }, error => {
            let errormess = new Error(error.message)
            throw errormess
        })
        .then(response => response.json())
        .then(airlines => dispatch(airlinesSuccess(airlines)))
        .catch(error => dispatch(airlinesFailed(error.message)))
}

export const airlinesFailed = errorMess => ({
    type: ActionTypes.POPULAR_AIRLINES_FAILED,
    payload: errorMess,
})

export const airlinesSuccess = airlines => ({
    type: ActionTypes.POPULAR_AIRLINES_SUCCESS,
    payload: airlines,
})



