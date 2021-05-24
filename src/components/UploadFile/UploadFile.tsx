import React, {ChangeEvent, useRef, useState} from 'react';
import {storage} from "../../index";
import s from './UploadFile.module.css'
import {uploadPhotoTC} from "../../redux/photos-reducer";
import {useDispatch, useSelector} from "react-redux";
import {setStatusAC} from "../../redux/app-reducer";
import {AppRootStateType} from "../../redux/store";

export const UploadFile = () => {

    const [url, setUrl] = useState("")
    const auth = useSelector((state: AppRootStateType) => state.firebase.auth)
    const dispatch = useDispatch()


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleUpload(e.target.files)
        }
    }

    const handleUpload = (image: any) => {
        let arrFile = [...image]
        let count = 0

        arrFile.forEach((el:any) => {
            console.log(el)
            dispatch(setStatusAC("loading"))

            const uploadTask = storage.ref(`images/${el.name}`).put(el)

            uploadTask.on(
                'state_changed',
                snapshot => {
                },
                error => {
                    console.log(error)
                },
                () => {
                    storage
                        .ref('images')
                        // @ts-ignore
                        .child(el.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url)
                            dispatch(setStatusAC("succeeded"))
                            count = count + 1

                            if (arrFile.length > count) {
                                dispatch(setStatusAC("loading"))
                            }

                            dispatch(uploadPhotoTC(el))
                        })
                }
            )

        })


    }


    return <div className={s.mainBlock}>

        <div className={s.item}>
            <label>
                <input type={'file'} style={{display: 'none'}} multiple onChange={handleChange}/>
                <span className={s.btn}>Upload</span>
            </label>

        </div>

    </div>
}