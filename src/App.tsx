import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {isLoaded} from "react-redux-firebase";
import {UploadFile} from "./components/UploadFile/UploadFile";
import {PhotosPage} from "./components/PhotosPage/PhotosPage";
import {RequestStatusType} from "./redux/app-reducer";
import {currentUser, database} from "./index";


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    //     .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    //     .catch((error) => {
    //         console.error("Error adding document: ", error);
    //     });

    return (
            <div className="App">
                {status === 'loading' && <LinearProgress className="linearProgress" color={"primary"}/>}
                <Header/>
                <PhotosPage />
                <div>

                </div>
            </div>
    );
}

export default App;
