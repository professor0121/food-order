// import Axios from "../../Axios/AxiosInstance"; // Import Axios instance
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


// export const fetchMeals = createAsyncThunk(
//     'meal/fetchMeals',
//     async () => {
//         const response = await Axios.get('/admin/meals');
//         return response.data;
//     }
// );

// export const getSingleMeal = createAsyncThunk(
//     'meal/getSingleMeal',
//     async (id) => {
//         const response = await Axios.get(`/admin/meals?id=${id}`);
//         return response.data;
//     }
// );


// const initialState = {
//     meals: [],
//     loading: false,
//     success: false,
//     error: null,
// }
// const mealSlice = createSlice({
//     name: 'meal',
//     initialState,
//     reducers: {
//         setMeals: (state, action) => {
//             state.meals = action.payload;
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setSuccess: (state, action) => {
//             state.success = action.payload;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchMeals.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchMeals.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.success = true;
//                 state.meals = action.payload;
//             })
//             .addCase(fetchMeals.rejected, (state, action) => {
//                 state.loading = false;
//                 state.success = false;
//                 state.error = action.payload;
//             })

//             .addCase(getSingleMeal.pending, (state)=>{
//                 state.loading=true;
//                 state.error=null;
//             })

//             .addCase(getSingleMeal.fulfilled,(state,action)=>{
//                 state.loading=false;
//                 state.success=true;
//                 state.singleMeal=action.payload;
//             })

//             .addCase(getSingleMeal.rejected,(state,action)=>{
//                 state.loading=false;
//                 state.success=false;
//                 state.error=action.payload;
//             })
//     }
// });

// export const { setMeals, setLoading, setSuccess, setError } = mealSlice.actions;

// export default mealSlice.reducer;


import Axios from "../../Axios/AxiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMeals = createAsyncThunk(
  'meal/fetchMeals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get('/users/meals');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSingleMeal = createAsyncThunk(
  'meal/getSingleMeal',
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/users/meals/single/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const initialState = {
  meals: [],
  singleMeal: null, // ✅ Added
  loading: false,
  success: false,
  error: null,
};

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
      // Fetch all meals
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
      })

      // Get single meal
      .addCase(getSingleMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleMeal = action.payload;
      })
      .addCase(getSingleMeal.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { setMeals, setLoading, setSuccess, setError } = mealSlice.actions;
export default mealSlice.reducer;
