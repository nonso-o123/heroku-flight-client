
import React, { useEffect, useState } from "react";
import DashboardNav from "./DashNav";
import UserCard from "../UserCard/UserCard";
import { useSelector, useDispatch } from "react-redux";

import { fetchUser } from '../../../redux/actionCreators/UsersActionCreators';
import Cookies from "js-cookie";

import styles from "./Dashboard.module.css";
import { Redirect } from "react-router-dom";

const Dashboard = ({ history }) => {
    const user = useSelector(state => state.user);
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!document.cookie) {
            setRedirect(true);
            return;
        } else {
            const cookie = Cookies.getJSON();
            if (Object(cookie).hasOwnProperty("userInfo")
                || Object(cookie).hasOwnProperty("userReg")
                || Object(cookie).hasOwnProperty("userRegister")) {
                setRedirect(false);
                dispatch(fetchUser());
            } else {
                setRedirect(true);
                return;
            }
        }
    }, []);

    const loading = typeof user.isLoading === "undefined" || user.isLoading;

    return (
        <div className={styles.Dashboard}>
            {redirect && <Redirect to="/" />}
            <DashboardNav />
            {loading ? <p>Loading...</p>
                :
                <div className={styles.User}>
                    {
                        user.userData.map((data, id) => {
                            return <UserCard key={id} userData={data} />
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Dashboard;