import Axios from "../../Axios/AxiosInstance"; // Import Axios instance
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const fetchMeals = createAsyncThunk(
    'meal/fetchMeals',
    async () => {
        const response = await Axios.get('/meals');
        return response.data;
    }
);

const initialState = {
    meals: [],
    loading: false,
    success: false,
    error: null,
}
const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {
        setMeals: (state, action) => {
            state.meals = action.payload;
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
            .addCase(fetchMeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.meals = action.payload;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    }
});

export const { setMeals, setLoading, setSuccess, setError } = mealSlice.actions;

export default mealSlice.reducer;
