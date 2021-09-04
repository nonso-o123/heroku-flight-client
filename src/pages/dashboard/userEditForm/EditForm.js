
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./EditForm.module.css";
import { updateUser } from "../../../redux/actionCreators/UsersActionCreators";

const EditForm = ({ defaultStateVal }) => {
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        controls: {
            email: {
                eleType: "input",
                eleConfig: {
                    type: "email",
                    required: true,
                    autoComplete: "off",
                    placeholder: "Email"
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                value: defaultStateVal.email
            },
            name: {
                eleType: "input",
                eleConfig: {
                    type: "email",
                    required: true,
                    autoComplete: "off",
                    placeholder: "Firstname Lastname"
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                value: defaultStateVal.name
            },
            isAdmin: {
                eleType: "input",
                label: "Is Admin",
                eleConfig: {
                    type: "checkbox",
                    required: true
                },
                valid: false,
                touched: false,
                value: defaultStateVal.isAdmin
            }
        }
    });

    // // check validity
    // const chectValidity = ( rules, value ) => {
    //     let isValid = true;
    //     if(rules.required) {
    //         isValid = value !== "" && isValid;
    //     }

    //     if(rules.email) {
    //         isValid = validator.isEmail(value) && isValid;
    //     }
    //     return isValid;
    // };

    const onInputChangeHandler = (event, field, userId) => {
        const value = field === "isAdmin" ? event.target.checked : event.target.value;
        dispatch(updateUser(field, value, userId));
        setFormState({
            ...formState,
            controls: {
                ...formState.controls,
                [field]: {
                    ...formState.controls[field],
                    value
                }
            }
        })
    }

    return (
        <div className={styles.EditForm}>
            <form>
                <div className={styles.FormContainer}>
                    {
                        Object.keys(formState.controls).map((key, id) => {
                            return <InputEle key={id}
                                eleType={formState.controls[key].eleType}
                                eleConfig={formState.controls[key].eleConfig}
                                label={formState.controls[key].label}
                                change={(event) => onInputChangeHandler(event, key, defaultStateVal.userId)}
                                value={formState.controls[key].value}
                            />
                        })
                    }
                </div>

            </form>
        </div>
    )
}

const InputEle = ({ eleConfig, label, change, value }) => {
    let ele = <div className={styles.FormGroup}>
        <label> {label} </label>
        <input
            onChange={change}
            value={value}
            {...eleConfig}
            checked={value}
        />
    </div>;
    return ele;
}

export default EditForm;