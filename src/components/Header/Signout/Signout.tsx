import React from 'react'
import s from './Signout.module.css'
import {useFirebase} from "react-redux-firebase";
import {authWithGoogleAC} from "../../../redux/auth-reducer";
import {useDispatch} from "react-redux";

export const Signout = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();

    const signOut = () => {
        firebase
            .logout().then(() => dispatch(authWithGoogleAC(false)))
    };

    return <div>
        <button className={s.btn} onClick={signOut}>Sign Out</button>
    </div>
}