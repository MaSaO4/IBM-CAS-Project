import { createSlice } from "@reduxjs/toolkit";

console.log('adminSlice');

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminId: '',
        token: '',
        isLoggedIn: false
    },
    reducers: {
        setAdminId: (state, action) => {
            state.adminId = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },

        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

console.log(adminSlice.reducer);

export default adminSlice.reducer;

export const { setAdminId, setToken, setLoggedIn } = adminSlice.actions;
