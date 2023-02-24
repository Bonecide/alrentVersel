import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    isAuth :  false,
    accessToken : null,
    refreshToken : null,
    canAddAd: true,

}

export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers : {
        setAuth : (state) => {
            state.isAuth = true;
            //localStorage.setItem('isAuth', 'true')
        },
        setTokens: (state,action) => {
            state.accessToken = action.payload.access,
            state.refreshToken = action.payload.refresh
            //localStorage.setItem('access', action.payload.access)
            //localStorage.setItem('refresh', action.payload.refresh)
        }
    }
});
export const { setAuth,setTokens } = authSlice.actions

export default authSlice.reducer