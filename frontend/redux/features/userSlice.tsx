import {createSlice,PayloadAction} from "@reduxjs/toolkit"


interface AuthState{
    isAuthenticated:boolean,
    isLoading:boolean
    accessToken:string|null,
    refreshToken:string|null,
    userinfo:{
        email:string,
        full_name:string,
        id:number
    } | null
}

interface setAuthProps{
    accessToken:string,
    refreshToken:string,
    userinfo:{
        email:string,
        full_name:string,
        id:number
    }|null
}

const initialState = {
    isAuthenticated:false,
    isLoading:true,
    accessToken:null,
    refreshToken:null,
    userinfo:null
} as AuthState


const userSlice = createSlice({
     name:"user",
     initialState,
     reducers:{
        setAuth:(state,action:PayloadAction<setAuthProps>)=>{
             state.isAuthenticated = true;
             state.accessToken = action.payload.accessToken
             state.refreshToken = action.payload.refreshToken
             state.userinfo = action.payload.userinfo
        },
        setAccessToken:(state,action:PayloadAction<{accessToken:string}>)=>{
            state.isAuthenticated = true,
            state.accessToken = action.payload.accessToken
        },
        logout:state =>{
            state.isAuthenticated = false
            state.accessToken = null
            state.refreshToken = null
            state.userinfo = null
        },
        finishInitialLoad:state =>{
            state.isLoading = false
        }
     }
})


export const {setAccessToken,setAuth,logout,finishInitialLoad} = userSlice.actions
export default userSlice.reducer