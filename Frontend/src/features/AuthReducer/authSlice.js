import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authenticateUser, fetchRolePermissions } from './authThunk';

const tokenFromStorage = localStorage.getItem('token');
let decodedUser = null;

if (tokenFromStorage) {
  try {
    decodedUser = jwtDecode(tokenFromStorage);
  } catch (e) {
    console.error(e);
  }
}

const initialState = {
  token: tokenFromStorage || null,
  user: decodedUser || null,
  permissions: [], // parent menu ids (e.g., ['dashboard', 'courses'])
  isAuthenticated: !!tokenFromStorage,
  loading: {
    login: false,
    fetchPermissions: false,
  },
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.permissions = [];
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setTokenFromStorage(state, action) {
      const token = action.payload;
      state.token = token;
      state.user = jwtDecode(token);
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder => {
    builder
      // 🔐 Login Auth
      .addCase(authenticateUser.pending, state => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        const token = action.payload.token;
        const decoded = jwtDecode(token);
        state.token = token;
        state.user = decoded;
        state.isAuthenticated = true;
        localStorage.setItem('token', token);
        // Permissions will be fetched after this via fetchRolePermissions
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading.login = false;
        state.error = action.payload?.message || 'Login failed';
      })

      // 📥 Fetch Role Menus
      .addCase(fetchRolePermissions.pending, state => {
        state.loading.fetchPermissions = true;
        state.error = null;
      })
      .addCase(fetchRolePermissions.fulfilled, (state, action) => {
        state.loading.fetchPermissions = false;
        state.permissions = action.payload.data || [];
      })
      .addCase(fetchRolePermissions.rejected, (state, action) => {
        state.loading.fetchPermissions = false;
        state.error = action.payload?.message || 'Failed to fetch permissions';
      });
  },
});

export const { logout, setTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
