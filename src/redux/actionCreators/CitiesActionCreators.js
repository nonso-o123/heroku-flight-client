import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl'

//POPULAR CITIES... 
export const fetchCities = () => async (dispatch) => {
    console.log(baseUrl)
    return fetch(`${baseUrl}api/cities`)
        .then(response => {
            if (response.ok)
                return response
            else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`)
                error.response = response
                throw error
            }
        }, error => {
            let errmess = new Error(error.message)
            throw errmess
        })
        .then(response => response.json())
        .then(cities => dispatch(citiesSuccess(cities)))
        .catch(error => dispatch(citiesFailed(error.message)))
}

export const citiesFailed = errMess => ({
    type: ActionTypes.POPULARCITIES_FAILED,
    payload: errMess,
})

export const citiesSuccess = cities => ({
    type: ActionTypes.POPULARCITIES_SUCCESS,
    payload: cities,
})



