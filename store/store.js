import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import profileSlice from "./slices/ProfileSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice
    }
})