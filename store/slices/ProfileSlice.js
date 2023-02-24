import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userCash: "000.0 руб.",
    avatar: null,
    userId: 1,
    userInfo: {
        first_name: "Login"
    }
}

export const profileSlice = createSlice({

    name: 'profile',
    initialState,
    reducers : {
        setAvatar : (state, action) => {
            state.avatar = action.payload
        },
        setUserInfo : (state, action) => {
            state.userInfo = action.payload
        }
    }
});
export const { setAvatar, setUserInfo } = profileSlice.actions

export default profileSlice.reducer