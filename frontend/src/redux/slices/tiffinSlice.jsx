import Axios from "../../Axios/AxiosInstance"; // Import Axios instance
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



//create a tiffin services
export const createTiffin = createAsyncThunk(
    'tiffin/createTiffin',
    async (tiffinData, { rejectWithValue }) => {
        try {
            const response = await Axios.post('/admin/create-tiffin', tiffinData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    tiffins: [],
    loading: false,
    success: false,
    error: null,
}
const tiffinSlice = createSlice({
    name: 'tiffin',
    initialState,
    reducers: {
        setTiffins: (state, action) => {
            state.tiffins = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTiffin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTiffin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.tiffins.push(action.payload);
            })
            .addCase(createTiffin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    }
});

export const { setTiffins, setLoading, setSuccess, setError } = tiffinSlice.actions;

export default tiffinSlice.reducer;
