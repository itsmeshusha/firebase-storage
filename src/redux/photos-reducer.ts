import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setStatusAC} from "./app-reducer";

type InitialStateType = {
    photos: Array<string>
}


const initialState: InitialStateType = {
    photos: []
}

export const photosReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PHOTOS/SET-PHOTOS':
            return {...state, photos: action.photos}
        case 'PHOTOS/UPLOAD-PHOTOS':
            return {photos: [action.photo, ...state.photos]}

        default:
            return state
    }
}

export const setPhotosAC = (photos: Array<string>) => {
    return {
        type: 'PHOTOS/SET-PHOTOS',
        photos
    } as const
}
export const uploadPhotoAC = (photo: any) => {
    return {
        type: 'PHOTOS/UPLOAD-PHOTOS',
        photo
    } as const
}

type ActionsType = ReturnType<typeof setPhotosAC | typeof uploadPhotoAC>


export const getPhotosThunk = () => async (dispatch: Dispatch, getState: () => AppRootStateType, getFirebase: any) => {
    dispatch(setStatusAC('loading'))
    return getFirebase().storage().ref('images').listAll().then(async (res: any) => {
            let arr = await Promise.all(res.items.map((i: any) => i.getDownloadURL()))
        console.log(arr)
        //@ts-ignore
        dispatch(setPhotosAC(arr))
        dispatch(setStatusAC('succeeded'))
        }
    );

}

export const uploadPhotoTC = (photo: any) => async (dispatch: Dispatch, getState: () => AppRootStateType, getFirebase: any) => {
    dispatch(setStatusAC('loading'))
    return getFirebase().storage().ref('images').listAll().then(async (res: any) => {
        let arr = await Promise.all(res.items.map((i: any) => i.getDownloadURL()))
        console.log(arr)
        dispatch(uploadPhotoAC(photo))
        dispatch(setStatusAC('succeeded'))
        //@ts-ignore
        dispatch(setPhotosAC(arr))

    })
}