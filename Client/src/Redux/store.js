import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './Slices/AdminAuthSlice'


export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})