import React, {useEffect, useState} from 'react';
import s from './PhotosPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPhotosThunk} from "../../redux/photos-reducer";
import {AppRootStateType} from "../../redux/store";
import {xor} from 'lodash'
import {Checkbox} from "@material-ui/core";
import {downloadFile} from "./axios-download-file";

export const PhotosPage = () => {

    const photos = useSelector<AppRootStateType, Array<string>>(state => state.photos.photos)
    const [checked, setChecked] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhotosThunk())
    }, []);

    const toggleCheck = (el: string) => {
        if (el) {
            // @ts-ignore
            setChecked(xor(checked, [el]));
        }
    }
    const saveAllHandler = (selectedPhotos: Array<string>) => {
        return selectedPhotos.forEach(el => {
            return downloadFile.downloadFile(el)
        })
    }

    console.log(checked)
    return <div className={s.mainBlock}>
        {checked.length > 0 && <div className={s.accordion}>
            <div >
                <button className={s.btn} onClick={() => saveAllHandler(checked)}>Save selected photos</button>
            </div>
        </div>}
        <div className={s.item}>
            {photos.map((el) => <span>
                <img src={el} key={el}/>
                {/*@ts-ignore*/}
                <Checkbox checked={checked.includes(el)}
                          onChange={() => toggleCheck(el)}
                          color={"primary"}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </span>)}
        </div>
    </div>
}