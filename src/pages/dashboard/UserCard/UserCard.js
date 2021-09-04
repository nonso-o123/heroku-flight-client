
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../../redux/actionCreators/UsersActionCreators";
import EditForm from "../userEditForm/EditForm";

import styles from "./UserCard.module.css";

const UserCard = ({ userData }) => {
    const [showFormState, setShowFormState] = useState(false);

    const dispatch = useDispatch();

    const deleteUserHandler = (userId) => {
        dispatch(deleteUser(userId));
    }

    const onShowFormHandler = () => {
        if (showFormState) {
            console.log(userData)
            dispatch(updateUser(null, null, null, userData, true));
            console.log(showFormState, 'update now')
        }

        setShowFormState(s => setShowFormState(!s))
    }

    return (
        <div className={styles.UserCard}>
            <div className={styles.Top}>
                <span>{`${userData.fName} ${userData.lName}`}</span>
                <span>{userData.isAdmin ? "admin" : "non-admin"}</span>
            </div>

            <div className={styles.Bottom}>
                <span>{userData.email}</span>
                <div className={styles.Span}>
                    <span onClick={onShowFormHandler}>
                        {showFormState ? "update" : "edit"}
                    </span>
                    <span onClick={() => deleteUserHandler(userData._id)}>delete</span>
                </div>
            </div>
            <div className={[styles.EditForm, showFormState && styles.ShowEditForm].join(" ")}>
                <EditForm defaultStateVal={{
                    email: userData.email,
                    name: userData.fName + " " + userData.lName,
                    isAdmin: userData.isAdmin,
                    userId: userData._id
                }} />
            </div>
        </div>
    )
}

export default UserCard;