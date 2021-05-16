import React from 'react'
import s from './Header.module.css'
import {Signin} from "./Signin/Signin";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Signout} from "./Signout/Signout";
import {UploadFile} from "../UploadFile/UploadFile";
import {RequestStatusType} from "../../redux/app-reducer";
import {LinearProgress} from "@material-ui/core";

export const Header = () => {
    const auth = useSelector((state: AppRootStateType) => state.firebase.auth)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return <div className={s.header}>
        {status === 'loading' && <LinearProgress className="linearProgress" color={"primary"}/>}
        {auth && auth.uid
            ? <div className={s.item}>
                <Signout />
            </div>
            : <div className={s.item}>
                <Signin/>
            </div>
        }
        <div className={s.item}>
            <UploadFile />
        </div>


    </div>
}