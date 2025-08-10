// redux/store.jsx
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import mealReducer from './slices/mealSlice.jsx'
import tiffinReducer from './slices/tiffinSlice.jsx'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meal: mealReducer,
    tiffin: tiffinReducer,
  },
})
