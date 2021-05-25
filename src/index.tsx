import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import {createFirestoreInstance} from "redux-firestore";

const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
};

firebase.initializeApp({
    apiKey: "AIzaSyB0xJ6ldu2hdTYMAxaXJPh4JqojcWQPPaA",
    authDomain: "redux-firebase1.firebaseapp.com",
    projectId: "redux-firebase1",
    storageBucket: "redux-firebase1.appspot.com",
    messagingSenderId: "541972609459",
    appId: "1:541972609459:web:84c97c0025a541d265b3c6",
    databaseURL: "https://redux-firebase1-default-rtdb.firebaseio.com",
    measurementId: "G-40DHBB2EXX"
});
firebase.firestore();
firebase.firestore().enablePersistence();

export const storage = firebase.storage()
export const database = firebase.firestore()


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const currentUser = firebase.auth().currentUser
    } else {
        console.log('No user is signed in')
    }
})

export const currentUser = firebase.auth().currentUser

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App/>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
