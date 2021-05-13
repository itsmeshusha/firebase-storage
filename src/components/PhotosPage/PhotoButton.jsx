import firebase from 'firebase/';
import {useEffect, useState} from "react";

const PhotoButton = () => {

const storage = firebase.storage()
    const storageRef = firebase.storage().ref("images");

    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {

            let result = await storageRef.child('images').listAll();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

            return Promise.all(urlPromises);

        }

        const loadImages = async () => {
            const urls = await fetchImages();
            // setFiles(urls);
        }
        loadImages();
    }, []);


    const handleImage = event => {
        const image = event.target.files[0];
        setImage(image);
    };

    const onSubmit = event => {
        event.preventDefault();
        if (image === "") {
            console.log('error');
            return;
        }

        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            // next,
            // error,
            complete
        );
    };

    const complete = () => {
        storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
                setImageUrl(fireBaseUrl);
            });
    };

    // Now we get the references of these images
    storageRef.listAll().then(function(result) {
        result.items.forEach(function(imageRef) {
            // And finally display them
            console.log(result.items);
            displayImage(imageRef);
        });
    }).catch(function(error) {
        alert('error!')
    });

    function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function(url) {
            setImageUrl.push(url);
            // TODO: Display the image on the UI
        }).catch(function(error) {
            // Handle any errors
        });
    }

    return(
        <div>
            <h3 >Photos</h3>
            <div className="addphoto">
                <form onSubmit={onSubmit}>
                    <input type="file" onChange={handleImage} />
                    <button type="submit" >Submit</button>
                </form>
            </div>
            <img src={imageUrl} />

            {imageUrl.map((url) => (
                <img src={url}/>
            ))}
        </div>
    );

}

export default PhotoButton