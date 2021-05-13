import React, {ChangeEvent, useState} from 'react';
import {storage} from "../../index";
import {useDispatch} from "react-redux";
import s from './UploadFile.module.css'
// import { uploadFileTC } from "../../redux/uploadFile-reducer";

export const UploadFile = () => {
    const [image, setImage] = useState()
    const [url, setUrl] = useState("")
    const [progress, setProgress] = useState(0)

    const dispatch = useDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            // @ts-ignore
            setImage(e.target.files[0])
        }
    }
    // const handleUpload = () => {
    //     console.log('cxhv')
    //     dispatch(uploadFileTC)
    // }

    const handleUpload = () => {
        // @ts-ignore
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
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
                    })
            }
        )
    }
    return <div className={s.mainBlock}>
        <div className={s.item}>
            <input type={'file'} onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>

        <br />
        <div className={s.item}>
            <img src={url} />
        </div>


    </div>
}