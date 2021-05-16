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


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    // @ts-ignore
    // function AuthIsLoaded({children}) {
    //     const auth = useSelector<AppRootStateType>(state => state.firebase.auth)
    //     if (!isLoaded(auth)) return <LinearProgress className="linearProgress" color={"primary"}/>;
    //     return children
    // }

    return (
        // <AuthIsLoaded>

            <div className="App">
                {status === 'loading' && <LinearProgress className="linearProgress" color={"primary"}/>}
                <Header/>
                <PhotosPage />
            </div>
        // </AuthIsLoaded>
    );
}

export default App;
