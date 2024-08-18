import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        userName: '',
        isAuthenticated: false,
        phone: ''
    },
    reducers: {
        login(state, action){
            state.email = action.payload.email;
            state.userName = action.payload.userName;
            state.isAuthenticated = true;
            state.phone = action.payload.phone
        },
        logout(state){
            state.email = '';
            state.userName = '';
            state.isAuthenticated = false;
            state.phone = '';
            
        },
    }
})

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;