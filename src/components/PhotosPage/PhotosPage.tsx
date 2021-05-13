import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import s from './PhotosPage.module.css'

export const PhotosPage = () => {

    const [images, setImages] = useState<Array<any>>([])

    const storageRef = firebase.storage().ref("images");


    useEffect(() => {

        const result = storageRef.listAll()
            .then(async res => {
                let newArr = [...images]
                let arr = await Promise.all(res.items.map(i => i.getDownloadURL()))

                console.log(arr)
                setImages(arr)

            })

    }, []);

    console.log(images)
    return <div className={s.mainBlock}>
        <div className={s.item}>
            {images.map(el => <img src={el} key={el}/>)}
        </div>
    </div>
}