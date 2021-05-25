import React, {useEffect} from 'react'
import s from './Signin.module.css'
import {useFirebase} from "react-redux-firebase";
import {useDispatch} from "react-redux";
import {authWithGoogleAC} from "../../../redux/auth-reducer";
import firebase from "firebase";
import {database} from "../../../index";

export const Signin = () => {
    const dispatch = useDispatch()
    const firebaseRedux = useFirebase();
    let uid = firebase?.auth()?.currentUser?.uid

    useEffect(() => {
        console.log('+++++++++++++++++++++++++++++++++++++++')
        firebase.auth().getRedirectResult().then(result => {

            let user = result.user;
            if (user) {
                database.collection('users').doc(firebase?.auth()?.currentUser?.uid)
                    .set({
                        email: user?.email,
                        name: user?.displayName
                    })
            }
        })
    }, [uid])

    const signInWithGoogle = () => {
        firebaseRedux
            .login({
                provider: "google",
                type: "redirect",
            })
            .then((value: any) => {
                dispatch(authWithGoogleAC(!!value));
            })
    }

    return <div>
        <button className={s.btn}  onClick={signInWithGoogle}>Sign In with Google</button>

    </div>
}