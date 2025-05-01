import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authenticateUserThunk } from './authThunk';

const tokenFromStorage = localStorage.getItem('token');
let decodedUser = null;

if (tokenFromStorage) {
  try {
    decodedUser = jwtDecode(tokenFromStorage);
    decodedUser.role = decodedUser.role.toLowerCase();
  } catch (e) {
    console.error('Invalid stored token:', e);
  }
}

const initialState = {
  token: tokenFromStorage || null,
  user: decodedUser || null,
  isAuthenticated: !!tokenFromStorage,
  permissions: [],
  loading: {
    login: false,
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
