import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/AxiosInstance';

// Async thunks for users operations
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, limit = 10, role = 'all' }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users?page=${page}&limit=${limit}&role=${role}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/users', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  users: [],
  selectedUser: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    limit: 10,
  },
  filters: {
    role: 'all',
    status: 'all',
    searchTerm: '',
  },
  loading: {
    users: false,
    selectedUser: false,
    create: false,
    update: false,
    delete: false,
    updateStatus: false,
  },
  error: {
    users: null,
    selectedUser: null,
    create: null,
    update: null,
    delete: null,
    updateStatus: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersErrors: (state) => {
      state.error = {
        users: null,
        selectedUser: null,
        create: null,
        update: null,
        delete: null,
        updateStatus: null,
      };
    },
    setUsersFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    resetUsers: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.loading.users = true;
        state.error.users = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading.users = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
        state.error.users = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.users = false;
        state.error.users = action.payload;
      })
      // Fetch user by ID cases
      .addCase(fetchUserById.pending, (state) => {
        state.loading.selectedUser = true;
        state.error.selectedUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading.selectedUser = false;
        state.selectedUser = action.payload;
        state.error.selectedUser = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading.selectedUser = false;
        state.error.selectedUser = action.payload;
      })
      // Create user cases
      .addCase(createUser.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading.create = false;
        state.users.unshift(action.payload);
        state.error.create = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })
      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.update = false;
        const userIndex = state.users.findIndex(user => user.id === action.payload.id);
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
        }
        if (state.selectedUser && state.selectedUser.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
        state.error.update = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })
      // Delete user cases
      .addCase(deleteUser.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        if (state.selectedUser && state.selectedUser.id === action.payload) {
          state.selectedUser = null;
        }
        state.error.delete = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      })
      // Update user status cases
      .addCase(updateUserStatus.pending, (state) => {
        state.loading.updateStatus = true;
        state.error.updateStatus = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading.updateStatus = false;
        const userIndex = state.users.findIndex(user => user.id === action.payload.id);
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
        }
        if (state.selectedUser && state.selectedUser.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
        state.error.updateStatus = null;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading.updateStatus = false;
        state.error.updateStatus = action.payload;
      });
  },
});

export const { clearUsersErrors, setUsersFilter, clearSelectedUser, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
