import React, { useState, useRef, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom'
import logo from "../images/logo.png";
import Cookie from 'js-cookie'

import { logoutUser } from "../redux/actionCreators/UsersActionCreators";

function Navbar({ modalOpen, setModalOpen }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const mobileRef = useRef()

    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const homeClass = location.pathname.match(/^\/(?!information)(?!contact)(?!about)(?!login)[\s\S]*$/) ? "active" : ""
    const infoClass = location.pathname.match(/^\/information/) ? "active" : ""
    const loginClass = location.pathname.match(/^\/login/) ? "active" : ""

    const userSignin = useSelector(state => state.userSignin)
    const userRegister = useSelector(state => state.userRegister)

    const reg = ({ rgstr }) => { return rgstr && rgstr.userReg }
    const userReg = reg({ rgstr: userRegister })

    const user = ({ usr }) => { return usr && usr.userInfo }
    const userInfo = user({ usr: userSignin })
    console.log(userReg);
    const onLogoutHandler = () => {
        Cookie.remove("userInfo");
        Cookie.remove("userReg");
        Cookie.remove("userRegister");
        dispatch(logoutUser());
        history.replace("/logout");
    }
    const onNavToDashboardHander = () => {
        const cookie = Cookie.getJSON();
        if ((Object(cookie).hasOwnProperty("userInfo"))
            || (Object(cookie).hasOwnProperty("userReg"))
            || (Object(cookie).hasOwnProperty("userRegister"))) {

            const isAdmin = (cookie.userInfo !== undefined && cookie.userInfo.isAdmin)
                || (cookie.userReg !== undefined && cookie.userReg.isAdmin)
                || (cookie.userRegister !== undefined && cookie.userRegister.isAdmin);
            if (isAdmin) {
                history.push("/dashboard");
            }
        } else {
            return;
        }

    }

    useEffect(() => {
        document.addEventListener('mousedown', handleNavOpen);
        return () => document.removeEventListener('mousedown', handleNavOpen);
    })
    const handleNavOpen = e => {
        if (isOpen) {
            if (!mobileRef.current.contains(e.target)) {
                setIsOpen(!isOpen)

            }
        }
    }

    return (
        <Fragment>
            <header className="header">

                <div className="nav-top">
                    <Link to="/">
                        <img
                            className="nav-img"
                            src={logo}
                            alt="Ijelinks"
                        />
                    </Link>
                    <Link to="/">Call: &emsp;+234 456 6789</Link>

                </div>
                <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                    &#9776;
                </button>
                <ul className={isOpen ? "nav-mobile" : "nav-links"} ref={mobileRef}>
                    <Link to="/" className={homeClass} onClick={() => isOpen && setIsOpen(!isOpen)}><li>Flights</li></Link>
                    <Link to="/information" className={infoClass} onClick={() => isOpen && setIsOpen(!isOpen)}><li>Information</li></Link>
                    {
                        userSignin && userSignin.name !== undefined ?
                            <span className={[loginClass, "profile-dropdown"].join(" ")}>
                                <li id="profile-button" onClick={onNavToDashboardHander}>
                                    {userSignin.name.charAt(0).toUpperCase()}
                                </li>
                                <div className="profile-dropdown-items">
                                    <span onClick={onLogoutHandler}> Logout </span>
                                </div>
                            </span> :
                            userInfo && userInfo.name !== undefined ?
                                <span className={[loginClass, "profile-dropdown"].join(" ")}>
                                    <li id="profile-button" onClick={onNavToDashboardHander}>
                                        {userInfo.name.charAt(0).toUpperCase()}
                                    </li>
                                    <div className="profile-dropdown-items">
                                        <span onClick={onLogoutHandler}> Logout </span>
                                    </div>
                                </span> :
                                userRegister && userRegister.fName !== undefined ?
                                    <span className={[loginClass, "profile-dropdown"].join(" ")}>
                                        <li id="profile-button" onClick={onNavToDashboardHander}>
                                            {userRegister.fName.charAt(0).toUpperCase()}
                                        </li>
                                        <div className="profile-dropdown-items">
                                            <span onClick={onLogoutHandler}> Logout </span>
                                        </div>
                                    </span> :
                                    userReg && userReg.fName !== undefined ?
                                        <span className={[loginClass, "profile-dropdown"].join(" ")}>
                                            <li id="profile-button" onClick={onNavToDashboardHander}>
                                                {userReg.fName.charAt(0).toUpperCase()}
                                            </li>
                                            <div className="profile-dropdown-items">
                                                <span onClick={onLogoutHandler}> Logout </span>
                                            </div>
                                        </span> :
                                        <li id="signin" onClick={() => { isOpen && setIsOpen(!isOpen); setModalOpen(!modalOpen) }} >Sign in</li>
                    }
                </ul>
            </header>
            <div className={isOpen ? "mobile-nav-overlay" : "hidden"}></div>
        </Fragment>

    )
}
export default withRouter(Navbar)