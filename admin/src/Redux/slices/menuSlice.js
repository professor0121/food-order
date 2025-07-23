import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/AxiosInstance';

// Async thunks for menu operations
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async ({ page = 1, limit = 10, category = 'all' }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/menu?page=${page}&limit=${limit}&category=${category}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchMenuItemById = createAsyncThunk(
  'menu/fetchMenuItemById',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/menu/${itemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createMenuItem = createAsyncThunk(
  'menu/createMenuItem',
  async (menuItemData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/menu', menuItemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async ({ itemId, menuItemData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/menu/${itemId}`, menuItemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/menu/${itemId}`);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'menu/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/menu/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  menuItems: [],
  selectedMenuItem: null,
  categories: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  },
  filters: {
    category: 'all',
    searchTerm: '',
  },
  loading: {
    menuItems: false,
    selectedMenuItem: false,
    create: false,
    update: false,
    delete: false,
    categories: false,
  },
  error: {
    menuItems: null,
    selectedMenuItem: null,
    create: null,
    update: null,
    delete: null,
    categories: null,
  },
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearMenuErrors: (state) => {
      state.error = {
        menuItems: null,
        selectedMenuItem: null,
        create: null,
        update: null,
        delete: null,
        categories: null,
      };
    },
    setMenuFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedMenuItem: (state) => {
      state.selectedMenuItem = null;
    },
    resetMenu: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch menu items cases
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading.menuItems = true;
        state.error.menuItems = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading.menuItems = false;
        state.menuItems = action.payload.menuItems;
        state.pagination = action.payload.pagination;
        state.error.menuItems = null;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading.menuItems = false;
        state.error.menuItems = action.payload;
      })
      // Fetch menu item by ID cases
      .addCase(fetchMenuItemById.pending, (state) => {
        state.loading.selectedMenuItem = true;
        state.error.selectedMenuItem = null;
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.loading.selectedMenuItem = false;
        state.selectedMenuItem = action.payload;
        state.error.selectedMenuItem = null;
      })
      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.loading.selectedMenuItem = false;
        state.error.selectedMenuItem = action.payload;
      })
      // Create menu item cases
      .addCase(createMenuItem.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading.create = false;
        state.menuItems.unshift(action.payload);
        state.error.create = null;
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })
      // Update menu item cases
      .addCase(updateMenuItem.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.loading.update = false;
        const itemIndex = state.menuItems.findIndex(item => item.id === action.payload.id);
        if (itemIndex !== -1) {
          state.menuItems[itemIndex] = action.payload;
        }
        if (state.selectedMenuItem && state.selectedMenuItem.id === action.payload.id) {
          state.selectedMenuItem = action.payload;
        }
        state.error.update = null;
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })
      // Delete menu item cases
      .addCase(deleteMenuItem.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.menuItems = state.menuItems.filter(item => item.id !== action.payload);
        if (state.selectedMenuItem && state.selectedMenuItem.id === action.payload) {
          state.selectedMenuItem = null;
        }
        state.error.delete = null;
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      })
      // Fetch categories cases
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
        state.error.categories = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.payload;
      });
  },
});

export const { clearMenuErrors, setMenuFilter, clearSelectedMenuItem, resetMenu } = menuSlice.actions;
export default menuSlice.reducer;
