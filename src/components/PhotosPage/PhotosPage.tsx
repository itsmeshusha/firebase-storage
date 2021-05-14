import React, {useEffect,  useState} from 'react';
import firebase from "firebase";
import s from './PhotosPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPhotosThunk} from "../../redux/photos-reducer";
import {AppRootStateType} from "../../redux/store";
import {RequestStatusType} from "../../redux/app-reducer";
import {LinearProgress} from "@material-ui/core";

export const PhotosPage = () => {

    const [images, setImages] = useState<Array<any>>([])
    // const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const photos = useSelector<AppRootStateType, Array<string>>(state => state.photos.photos)
    const storageRef = firebase.storage().ref("images");
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getPhotosThunk())

    }, []);

    console.log(images)
    return <div className={s.mainBlock}>
        <div className={s.item}>
            {/*{status === 'loading' && <LinearProgress className="linearProgress" color={"primary"}/>}*/}
            {photos.map(el => <img src={el} key={el}/>)}
        </div>
    </div>
}