import {Dispatch} from "redux";

const initialState = {
    auth: false
}

export const authReducer = (state: InitialStateType  = initialState, action: ActionType): InitialStateType => {
    switch(action.type) {
        case "AUTH/AUTH_WITH_GOOGLE": {
            return {
                ...state,
                auth: action.auth
            }
        }
    }
    return state
}

//AC
export const authWithGoogleAC = (auth: boolean) => ({type: "AUTH/AUTH_WITH_GOOGLE", auth})

//thunks
// export const signInTC = () => (dispatch: Dispatch, getState: any, {getFirebase}: any) => {
//     const firebase = getFirebase();
//     const provider = new firebase.auth.GoogleAuthProvider()
//     firebase.auth().signInWithPopup(provider)
//         .then((result: any) => {
//             dispatch(authWithGoogleAC(result));
//         })
// }

//types
type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof authWithGoogleAC>