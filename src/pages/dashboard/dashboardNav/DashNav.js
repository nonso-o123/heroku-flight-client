
import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./DashNav.module.css";

const nav = () => {

    return (
        <nav className={styles.Nav}>
            <ul>
                <li className={styles.NavLink}>
                    <NavLink to="/dashboard"> Overview </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default nav;