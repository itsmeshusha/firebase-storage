import React, {ChangeEvent, useRef, useState} from 'react';
import {storage} from "../../index";
import s from './UploadFile.module.css'
import {uploadPhotoTC} from "../../redux/photos-reducer";
import {useDispatch} from "react-redux";

export const UploadFile = () => {


    const [url, setUrl] = useState("")
    const dispatch = useDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.files && e.target.files[0]) {
            // @ts-ignore

            handleUpload(e.target.files[0])

        }
    }

    const handleUpload = (image:any) => {
        // @ts-ignore
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref('images')
                    // @ts-ignore
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url)
                        dispatch(uploadPhotoTC(image))
                    })
            }
        )

    }


    return <div className={s.mainBlock}>
        <div className={s.item}>
            <label>
                <input type={'file'} style={{display: 'none'}} multiple onChange={handleChange}/>
                <span >Upload</span>
            </label>

        </div>

    </div>
}