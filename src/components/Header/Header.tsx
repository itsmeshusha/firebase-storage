import React from 'react'
import s from './Header.module.css'
import {Signin} from "./Signin/Signin";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Signout} from "./Signout/Signout";

export const Header = () => {
    const auth = useSelector((state: AppRootStateType) => state.firebase.auth)

    return <div className={s.header}>
        {auth && auth.uid
            ? <div className={s.item}>
                <Signout />
            </div>
            : <div className={s.item}>
                <Signin/>
            </div>
        }

    </div>
}