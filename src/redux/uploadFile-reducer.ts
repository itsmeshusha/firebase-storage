import {Dispatch} from "redux";
import {storage} from "../index";

const initialState = {}

export const uploadFileReducer = (state = initialState, action: ActionType):InitialStateType => {
    switch(action.type) {
        case "UPLOAD/UPLOAD_FILE": {
            return {
                file: action.file,
                ...state
            }

        }
        default:
            return state;
    }
}

//AC
export const uploadFileAC = (file: any) => ({type: "UPLOAD/UPLOAD_FILE", file} as const)

//thunks
// export const uploadFileTC = (file: any) => (dispatch: Dispatch) => {
//     const uploadFile = storage.ref(`/images${file.name}`).put(file)
//     uploadFile.on(
//         'state_changed',
//         snapshot => {},
//         error => {
//             console.log(error)
//         },
//         () => {
//             storage
//                 .ref('images')
//                 // @ts-ignore
//                 .child(image.name)
//                 .getDownloadURL()
//                 .then(() => {
//                     console.log('dfdg')
//                     dispatch(uploadFileAC(file))
//                 })
//         }
//     )
// }



//types
type InitialStateType = {

}

type ActionType = ReturnType<typeof uploadFileAC>