import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authenticateUserThunk } from './authThunk';

const tokenFromStorage = localStorage.getItem('token');
let decodedUser = null;
let isExpired = false;

if (tokenFromStorage) {
  try {
    decodedUser = jwtDecode(tokenFromStorage);
    decodedUser.role = decodedUser.role.toLowerCase();
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedUser.exp < currentTime) {
      console.warn('JWT expired');
      localStorage.removeItem('token');
      decodedUser = null;
      isExpired = true;
    }
  } catch (e) {
    console.error('Invalid stored token:', e);
    localStorage.removeItem('token');
  }
}

const initialState = {
  token: isExpired ? '' : tokenFromStorage,
  user: decodedUser || null,
  isAuthenticated: !!tokenFromStorage && !isExpired,
  permissions: [],
  loading: {
    login: false,
  },
  error: '',
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
  },
  extraReducers: builder => {
    builder
      .addCase(authenticateUserThunk.pending, state => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(authenticateUserThunk.fulfilled, (state, action) => {
        const token = action.payload.token;
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        const expiresIn = decoded.exp - currentTime;
        if (expiresIn <= 0) {
          // Already expired
          return;
        }

        // Schedule logout
        setTimeout(() => {
          window.location.href = '/login'; // or use navigate() if using react-router
          localStorage.removeItem('token');
          window.location.reload(); // force logout & re-init state
        }, expiresIn * 5000);
        state.token = token;
        decoded.role = decoded.role.toLowerCase();
        state.user = decoded;
        state.isAuthenticated = true;
        localStorage.setItem('token', token);
        state.loading.login = false;
      })
      .addCase(authenticateUserThunk.rejected, (state, action) => {
        state.loading.login = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
