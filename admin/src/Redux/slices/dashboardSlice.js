import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/AxiosInstance';

// Async thunks for dashboard operations
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchRecentOrders = createAsyncThunk(
  'dashboard/fetchRecentOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/recent-orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSalesChart = createAsyncThunk(
  'dashboard/fetchSalesChart',
  async (period, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/dashboard/sales-chart?period=${period}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  stats: {
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  },
  recentOrders: [],
  salesChart: [],
  loading: {
    stats: false,
    recentOrders: false,
    salesChart: false,
  },
  error: {
    stats: null,
    recentOrders: null,
    salesChart: null,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardErrors: (state) => {
      state.error = {
        stats: null,
        recentOrders: null,
        salesChart: null,
      };
    },
    resetDashboard: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch stats cases
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload;
        state.error.stats = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload;
      })
      // Fetch recent orders cases
      .addCase(fetchRecentOrders.pending, (state) => {
        state.loading.recentOrders = true;
        state.error.recentOrders = null;
      })
      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.loading.recentOrders = false;
        state.recentOrders = action.payload;
        state.error.recentOrders = null;
      })
      .addCase(fetchRecentOrders.rejected, (state, action) => {
        state.loading.recentOrders = false;
        state.error.recentOrders = action.payload;
      })
      // Fetch sales chart cases
      .addCase(fetchSalesChart.pending, (state) => {
        state.loading.salesChart = true;
        state.error.salesChart = null;
      })
      .addCase(fetchSalesChart.fulfilled, (state, action) => {
        state.loading.salesChart = false;
        state.salesChart = action.payload;
        state.error.salesChart = null;
      })
      .addCase(fetchSalesChart.rejected, (state, action) => {
        state.loading.salesChart = false;
        state.error.salesChart = action.payload;
      });
  },
});

export const { clearDashboardErrors, resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
