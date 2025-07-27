import Axios from "../../Axios/AxiosInstance"; // Import Axios instance
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

export const loginUser=createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            console.log("credentials",credentials);
            const response = await Axios.post('/auth/users/login', credentials);
            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
              }
    
              return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const registerUser=createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await Axios.post('/auth/users/register', userData);
            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
              }
    
              return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const logoutUser=createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get('/auth/users/logout');
            console.log(response.data);
            localStorage.removeItem('token');
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const initialState={
    user:null,
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    loading:false,
    error:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        clearError:(state)=>{
            state.error=null;
        },
        resetAuth:(state)=>{
            state.user=null;
            state.token=null;
            state.isAuthenticated=false;
            state.loading=false;
            state.error=null;
            localStorage.removeItem('token');
        },
    },
    extraReducers:(builder)=>{
        builder
        //Login User Reducer Cases
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.error=null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null;
            state.token=null;
            state.error=action.payload;
        })
        //Register User Reducer Cases
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.error=null;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null;
            state.token=null;
            state.error=action.payload;
        })
        //Logout User Reducer Cases
        .addCase(logoutUser.fulfilled,(state)=>{
            state.user=null;
            state.token=null;
            state.isAuthenticated=false;
            state.loading=false;
            state.error=null;
        })
    },
})
export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
