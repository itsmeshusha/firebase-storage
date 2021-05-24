import React from 'react'
import s from './Signin.module.css'
import {useFirebase} from "react-redux-firebase";
import {useDispatch, useSelector} from "react-redux";
import {authWithGoogleAC} from "../../../redux/auth-reducer";
import {database} from "../../../index";
import firebase from 'firebase';
import {AppRootStateType} from "../../../redux/store";

export const Signin = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state: AppRootStateType) => state.firebase.auth)

    const firebaseRedux = useFirebase();

    const signInWithGoogle = () => {
        firebaseRedux
            .login({
                provider: "google",
                // type: "redirect",
                type: "popup",
            })
            .then((value: any) => {
                dispatch(authWithGoogleAC(!!value));
                console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
                firebase.auth().onAuthStateChanged(user => {
                    console.log(user)
                    database.collection('users').doc(firebase?.auth()?.currentUser?.uid)
                        .set({
                            email: user?.email,
                            name: user?.displayName
                        })
                    })

                })

// firebase.auth().getRedirectResult().then(async res => {
//     await database.collection('users').doc(firebase?.auth()?.currentUser?.uid)
//         .set({
//             email: res.user?.email,
//             name: res.user?.displayName
//         })

    };


    return <div>
        <button className={s.btn}  onClick={signInWithGoogle}>Sign In with Google</button>

    </div>
}