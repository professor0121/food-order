import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/AxiosInstance';

// Async thunks for orders operations
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page = 1, limit = 10, status = 'all' }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/orders?page=${page}&limit=${limit}&status=${status}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  orders: [],
  selectedOrder: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    limit: 10,
  },
  filters: {
    status: 'all',
    searchTerm: '',
  },
  loading: {
    orders: false,
    selectedOrder: false,
    updateStatus: false,
    delete: false,
  },
  error: {
    orders: null,
    selectedOrder: null,
    updateStatus: null,
    delete: null,
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersErrors: (state) => {
      state.error = {
        orders: null,
        selectedOrder: null,
        updateStatus: null,
        delete: null,
      };
    },
    setOrdersFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    resetOrders: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders cases
      .addCase(fetchOrders.pending, (state) => {
        state.loading.orders = true;
        state.error.orders = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading.orders = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
        state.error.orders = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading.orders = false;
        state.error.orders = action.payload;
      })
      // Fetch order by ID cases
      .addCase(fetchOrderById.pending, (state) => {
        state.loading.selectedOrder = true;
        state.error.selectedOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading.selectedOrder = false;
        state.selectedOrder = action.payload;
        state.error.selectedOrder = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading.selectedOrder = false;
        state.error.selectedOrder = action.payload;
      })
      // Update order status cases
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading.updateStatus = true;
        state.error.updateStatus = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading.updateStatus = false;
        // Update the order in the orders array
        const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = action.payload;
        }
        // Update selected order if it's the same
        if (state.selectedOrder && state.selectedOrder.id === action.payload.id) {
          state.selectedOrder = action.payload;
        }
        state.error.updateStatus = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading.updateStatus = false;
        state.error.updateStatus = action.payload;
      })
      // Delete order cases
      .addCase(deleteOrder.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.orders = state.orders.filter(order => order.id !== action.payload);
        if (state.selectedOrder && state.selectedOrder.id === action.payload) {
          state.selectedOrder = null;
        }
        state.error.delete = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      });
  },
});

export const { clearOrdersErrors, setOrdersFilter, clearSelectedOrder, resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
