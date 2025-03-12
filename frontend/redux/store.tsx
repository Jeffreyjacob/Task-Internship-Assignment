"use client"

import {combineReducers,configureStore} from "@reduxjs/toolkit"
import {Provider,TypedUseSelectorHook,useDispatch,useSelector} from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import {setupListeners} from "@reduxjs/toolkit/query";
import {persistReducer,persistStore} from 'redux-persist';
import storage  from "redux-persist/lib/storage";
import userReducer from "./features/userSlice"
import { useEffect, useRef, useState } from "react";
import { apiSlice } from "@/services/apiservice";


const rootReducer = combineReducers({
    [apiSlice.reducerPath]:apiSlice.reducer,
    user:userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = ()=>{
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware)
    })
}


export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector


export default function StoreProvider ({children}:{children:React.ReactNode}){
    const storeRef = useRef<AppStore>();
    const [isClient,setIsClient] = useState(false);

    useEffect(()=>{
     setIsClient(true)
     if(!storeRef.current){
        storeRef.current = store()
        setupListeners(storeRef.current.dispatch)
     }
    },[])

    if(!isClient || !storeRef.current){
        return null;
    }

    const persistor = persistStore(storeRef.current)

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
