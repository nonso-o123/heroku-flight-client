import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signinUser } from '../redux/actionCreators/UsersActionCreators'
import { registerUser } from '../redux/actionCreators/UsersActionCreators'


const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
const validName = val => /^[A-Z]'?[A-Z]+(-[A-Z]+)?$/ig.test(val)
const validPass = val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/gm.test(val)

function RegisterForm({ modalOpen, setModalOpen }) {

    const [login, setLogin] = useState(true)
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pwdConfirm, setPwdConfirm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [nameValError, setNameValError] = useState({
        fname: false,
        lname: false,
        email: false,
        pass_word: false,
        passwd_confirm: false
    })

    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const userRegister = useSelector(state => state.userRegister)

    const err = ({ user }) => { return user && user.error }

    const reg = ({ rgstr }) => { return rgstr && rgstr.userReg }
    const userReg = reg({ rgstr: userRegister })

    const user = ({ usr }) => { return usr && usr.userInfo }
    const userInfo = user({ usr: userSignin })


    useEffect(() => {
        (userReg || userInfo) && modalOpen &&
            setModalOpen(!modalOpen)
    }, [userInfo, userReg])

    const handleChange = (e) => {
        let name = e.target.name
        let val = e.target.value
        if (!login) {
            switch (name) {
                case 'first_name':
                    if (!validName(val))
                        setNameValError({ ...nameValError, fname: true })
                    else if (validName(val) && (val.length > 15 || val.length < 3)) {
                        setNameValError({ ...nameValError, fname: true })
                    } else {
                        setNameValError({ ...nameValError, fname: false })
                    }
                    break;
                case 'last_name':
                    if (!validName(val))
                        setNameValError({ ...nameValError, lname: true })
                    else if (validName(val) && (val.length > 15 || val.length < 3)) {
                        setNameValError({ ...nameValError, lname: true })
                    } else {
                        setNameValError({ ...nameValError, lname: false })
                    }
                    break;
                case 'email':
                    if (!validEmail(val))
                        setNameValError({ ...nameValError, email: true })
                    else setNameValError({ ...nameValError, email: false })
                    break;
                case 'password':
                    if (!validPass(val)) {
                        setNameValError({ ...nameValError, pass_word: true })
                        setErrorMessage(`
                        Password must be 
                        - 8 characters or more
                        - contain uppercase and lowercase 
                        - contain special characters`
                        )
                    }
                    else {
                        setNameValError({ ...nameValError, pass_word: false })
                        setErrorMessage('')
                    }
                    break;
                case 'passwd_confirm':
                    password !== pwdConfirm ? setNameValError({ ...nameValError, passwd_confirm: false }) :
                        setNameValError({ ...nameValError, passwd_confirm: true })
                    break;
                default:
                    break;
            }
        }

    }

    const validate = (fname, lname, eml, pass, passwd_c) => {
        if (!login) {
            fname = fName.length > 0 && !nameValError.fname
            lname = lName.length > 0 && !nameValError.lname
            eml = email.length > 0 && !nameValError.email
            pass = password.length > 0 && !nameValError.password
            passwd_c = pwdConfirm.length > 0 && !nameValError.passwd_confirm
            return {
                fname: fname,
                lname: lname,
                eml: eml,
                pass: pass,
                passwd_c: passwd_c
            }
        } else {
            return {
                eml: email.length > 0,
                pass: password.length > 0
            }
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate(fName, lName, email, password, pwdConfirm)
        const failed = Object.keys(errors).some(n => !errors[n])
        console.log(errors)
        console.log(failed)
        if (failed) {
            setErrorMessage('Values must be valid')
            return
        }
        else {
            setErrorMessage('')
            login ? dispatch(signinUser(email, password)) :
                dispatch(registerUser(fName, lName, email, password))
        }
    }


    return (
        <div className="card mx-xl-5 boxes">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <h4 className="text-center py-4">{login ? "Have an account? Sign in" : "Register"}</h4>
                    <li className="list-unstyled text-center mb-3" style={{ color: "red" }}>{err({ user: userSignin }) && (<div>{err({ user: userSignin })}</div>)}</li>
                    <div className={!login ? "signup-div" : "hidden"}>
                        <label htmlFor="first_name" className="grey-text font-weight-light">First name</label>
                        <input type="text" name="first_name" id="first_name" className={`form-control signup-input ${nameValError.fname ? 'signup-input-error' : ''}`}
                            onChange={(e) => { handleChange(e); setFName(e.target.value) }}
                        />
                    </div>
                    <div className={!login ? "signup-div" : "hidden"}>
                        <label htmlFor="last_name" className="grey-text font-weight-light">Last name</label>
                        <input type="text" name="last_name" id="last_name" className={`form-control signup-input ${nameValError.lname ? 'signup-input-error' : ''}`}
                            onChange={(e) => { handleChange(e); setLName(e.target.value) }}
                        />
                    </div>
                    <div className="signup-div">
                        <label htmlFor="email" className="grey-text font-weight-light">Your email</label>
                        <input type="email" name="email" id="email" className={`form-control signup-input ${nameValError.email ? 'signup-input-error' : ''}`}
                            onChange={(e) => { handleChange(e); setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="signup-div">
                        <label htmlFor="password" className="grey-text font-weight-light">Password</label>
                        <input type="password" name="password" id="password" className={`form-control signup-input ${nameValError.password ? 'signup-input-error' : ''}`}
                            onChange={(e) => { handleChange(e); setPassword(e.target.value) }} />
                    </div>
                    <div className={!login ? "signup-div" : "hidden"}>
                        <label htmlFor="passwd_confirm" className="grey-text font-weight-light">Re-enter Password</label>
                        <input type="password" name="passwd_confirm" id="passwd_confirm" className={`form-control signup-input ${nameValError.passwd_confirm ? 'signup-input-error' : ''}`}
                            onChange={(e) => { handleChange(e); setPwdConfirm(e.target.value) }} />
                    </div>
                    <p style={{ color: "red", whiteSpace: "pre" }} className="input-errorMess text-left mt-0">{errorMessage}</p>
                    <div className="text-center py-4 mt-3">
                        <button className="btn btn-outline-purple" type="submit">Send<i
                            className="fa fa-paper-plane-o ml-2"></i></button>
                    </div>
                </form>
                <p className="text-center">Or <span className="signup-link" onClick={() => setLogin(!login)}>{login ? "Sign Up " : "Login "}</span>for cheapest deals</p>
            </div>

        </div>

    )
}
export default withRouter(RegisterForm)