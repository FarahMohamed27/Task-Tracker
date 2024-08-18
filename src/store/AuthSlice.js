import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import useAuth from "../hooks/useAuth";


export const getUserData = createAsyncThunk('data/fetchData',
    async({email, password} , {rejectWithValue}) => {
        try{
            const response = await axios.get(`http://localhost:3001/userData?email=${email}`)
            const userData = response.data[0];
            console.log("entered getUserData");
            console.log(userData);
            if(userData && userData.password === password){
                return userData;
            }
            else{
                return rejectWithValue("Invalid Password or Email");
            }
        }
        catch(error){
            return rejectWithValue("an error occurred");
        }
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        userName: '',
        isAuthenticated: false,
        status: 'idle',
        phone: ''
    },
    reducers: {
        logout(state){
            state.email = '';
            state.userName = '';
            state.isAuthenticated = false;
            state.phone = '';
        },

    },
    extraReducers:(builder) => {
        builder
        .addCase(getUserData.pending, (state) => {
            state.status = "Loading";
        })
        .addCase(getUserData.fulfilled, (state, action) =>{
            const userData = action.payload;
            state.email = userData.email;
            state.userName = userData.userName;
            state.isAuthenticated = true;
            state.phone = userData.phone;
            state.status = 'succeeded';
        })
        .addCase(getUserData.rejected, (state,action) =>{
            state.status = 'failed';
            state.isAuthenticated = false;
            state.error = action.payload || "An Unknown error occurred"
        } )
    }
})

export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer;