import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/auth/loginSlice";
import registerReducer from "../features/auth/registerSlice";
import verifyEmailReducer from "../features/auth/verifyEmailSlice";
import  resetPasswordReducer  from "../features/auth/resetPassSlice";
import getUserReducer from "../features/user/showUserSlice";
import userDetailReducer from "../features/user/fetchDetailSlice";


export const store = configureStore({
    reducer:{
       login:loginReducer,
       register:registerReducer,
       verifyEmail: verifyEmailReducer,
       resetPassword: resetPasswordReducer,
       getUsers: getUserReducer,
       userDetail : userDetailReducer
    }
})