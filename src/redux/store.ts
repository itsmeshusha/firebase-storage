import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {uploadFileReducer} from "./uploadFile-reducer";
import { getFirebase } from 'react-redux-firebase'
import {photosReducer} from "./photos-reducer";


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    app: appReducer,
    upload: uploadFileReducer,
    photos: photosReducer,
})

const middlewares = [
    thunk.withExtraArgument(getFirebase)
]

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares),
    ));
//@ts-ignore
window.store = store

export type AppRootStateType = ReturnType<typeof rootReducer>