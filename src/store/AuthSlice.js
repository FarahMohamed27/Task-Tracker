import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

function generateId() {
    const now = new Date();
    return now.toISOString().replace(/[-:.]/g, ''); 
}

export const signUp = createAsyncThunk('auth/signup',
    async({email, userName, phone, password}, { rejectWithValue}) =>{
        try{
            const response = await axios.get(`http://localhost:3001/userData?email=${email}`)
            if(response.data.length > 0){
                console.log("email already Exists");
                return rejectWithValue( 'Email already exists');   
            }
            else{
                const id = generateId();
                const user = {
                    id: id,
                    email: email,
                    userName: userName,
                    phone: phone,
                    password: password
                }
                const signUpResponse = await axios.post('http://localhost:3001/userData', user);
                console.log(signUpResponse.data);
                return signUpResponse.data
            }
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)

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
        phone: '',
        error: ''
    },
    reducers: {
        logout(state){
            state.email = '';
            state.userName = '';
            state.isAuthenticated = false;
            state.phone = '';
        },
        clearStatus(state) {
            state.status = 'idle';
            state.error = '';
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
        } )
        .addCase(signUp.fulfilled, (state,action)=>{
            const userData = action.payload;
            state.isAuthenticated = true;
            state.email = userData.email;
            state.userName = userData.userName;
            state.phone = userData.phone;
            state.status = 'succeeded';
        })
        .addCase(signUp.rejected , (state,action)=>{
            state.status = 'failed';
            state.error = action.payload;
            state.isAuthenticated = false;
        })
    }
})

export const {logout, clearStatus} = AuthSlice.actions;
export default AuthSlice.reducer;