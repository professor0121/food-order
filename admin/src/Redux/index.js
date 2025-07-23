// Store
export { store } from './store';

// Provider
export { ReduxProvider } from './Provider';

// Hooks
export { useAppDispatch, useAppSelector } from './hooks';

// Auth slice
export {
  loginAdmin,
  logoutAdmin,
  checkAuthStatus,
  clearError as clearAuthError,
  resetAuth,
} from './slices/authSlice';

// Dashboard slice
export {
  fetchDashboardStats,
  fetchRecentOrders,
  fetchSalesChart,
  clearDashboardErrors,
  resetDashboard,
} from './slices/dashboardSlice';

// Orders slice
export {
  fetchOrders,
  fetchOrderById,
  updateOrderStatus,
  deleteOrder,
  clearOrdersErrors,
  setOrdersFilter,
  clearSelectedOrder,
  resetOrders,
} from './slices/ordersSlice';

// Menu slice
export {
  fetchMenuItems,
  fetchMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  fetchCategories,
  clearMenuErrors,
  setMenuFilter,
  clearSelectedMenuItem,
  resetMenu,
} from './slices/menuSlice';

// Users slice
export {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  clearUsersErrors,
  setUsersFilter,
  clearSelectedUser,
  resetUsers,
} from './slices/usersSlice';
