import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        token: '',
        isLoggedIn: false
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },

        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

console.log(userSlice.reducer);
export default userSlice.reducer;

export const { setCurrentUser, setToken, setLoggedIn } = userSlice.actions;
