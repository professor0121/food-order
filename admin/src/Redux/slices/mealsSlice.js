import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../Axios/AxiosInstance';

export const createMeal = createAsyncThunk("meal/createMeal", async (mealData, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/admin/meals/create", mealData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    resetMealState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMeal.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMealState } = mealSlice.actions;
export default mealSlice.reducer;
