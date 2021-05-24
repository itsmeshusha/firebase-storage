import React, {useEffect,  useState} from 'react';
import s from './PhotosPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPhotosThunk} from "../../redux/photos-reducer";
import {AppRootStateType} from "../../redux/store";
import {RequestStatusType} from "../../redux/app-reducer";

export const PhotosPage = () => {

    const auth = useSelector((state: AppRootStateType) => state.firebase.auth)
    const photos = useSelector<AppRootStateType, Array<string>>(state => state.photos.photos)
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getPhotosThunk())

    }, []);

    return <div className={s.mainBlock}>
        <div className={s.item}>
            {photos.map(el => <img src={el} key={el}/>)}
        </div>
    </div>
}