import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/AxiosInstance';

export const createTiffin = createAsyncThunk(
    'tiffin/createTiffin',
    async (tiffinData, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/admin/tiffin/create-tiffin', tiffinData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAllTiffin = createAsyncThunk(
    'tiffin/getAllTiffin',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/admin/tiffin/get-tiffin');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    tiffins: [],
    loading: false,
    success: false,
    error: null,
};

const tiffinSlice = createSlice({
    name: 'tiffin',
    initialState,
    reducers: {
        resetTiffinState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTiffin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createTiffin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.tiffins.push(action.payload);
            })
            .addCase(createTiffin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getAllTiffin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTiffin.fulfilled, (state, action) => {
                state.loading = false;
                state.tiffins = action.payload;
            })
            .addCase(getAllTiffin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetTiffinState } = tiffinSlice.actions;
export default tiffinSlice.reducer;
