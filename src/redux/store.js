import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { citiesReducer } from './reducers/citiesReducer'
import { airlinesReducer } from './reducers/airlinesReducer'
import { contactUsReducer } from './reducers/contactUsReducer'
import { userRegisterReducer, userSigninReducer, userReducer } from './reducers/usersReducer'
import thunk from 'redux-thunk'
import Cookies from 'js-cookie'

const userInfo = Cookies.get('userInfo') || null
const userReg = Cookies.get('userReg') || null
const initialState = { userSignin: userInfo, userRegister: userReg }


const reducer = combineReducers({
    cities: citiesReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    user: userReducer,
    airlines: airlinesReducer,
    contactMessage: contactUsReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store;