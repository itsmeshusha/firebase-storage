import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {uploadFileReducer} from "./uploadFile-reducer";


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    app: appReducer,
    upload: uploadFileReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>