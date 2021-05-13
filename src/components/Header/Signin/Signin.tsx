import React from 'react'
import s from './Signin.module.css'
import {useFirebase} from "react-redux-firebase";
import {useDispatch} from "react-redux";
import {authWithGoogleAC} from "../../../redux/auth-reducer";

export const Signin = () => {
    const dispatch = useDispatch()

    const firebase = useFirebase();

    const signInWithGoogle = () => {
        firebase
            .login({
                provider: "google",
                type: "redirect",
            })
            .then((value: any) => {
                dispatch(authWithGoogleAC(!!value));
            })
            .catch(e => {
                dispatch(authWithGoogleAC(false));
            });

    };

    return <div>
        <button className={s.btn}  onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
}