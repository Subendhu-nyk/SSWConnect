import { createSlice } from '@reduxjs/toolkit';
import { addBulkUsersThunk, addUserThunk, getUserThunk } from './userManagementThunk';

const initialState = {
  addStaffData: null,
  addBulkUsersData: null,
  getUserDetails: [],
  error: null,
  loading: {
    addStaffLoading: false,
    addBulkUsersLoading: false,
    getUserDetailsLoading: false,
  },
};
const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState,
  extraReducers: builder => {
    builder
      // updateSystemId
      .addCase(addUserThunk.pending, state => {
        state.loading.addStaffLoading = true;
        state.error = null;
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.loading.addStaffLoading = false;
        state.addStaffData = action.payload.data;
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.loading.addStaffLoading = false;
        state.error = action.payload;
      })
      .addCase(addBulkUsersThunk.pending, state => {
        state.loading.addBulkUsersLoading = true;
        state.error = null;
      })
      .addCase(addBulkUsersThunk.fulfilled, (state, action) => {
        state.loading.addBulkUsersLoading = false;
        state.addBulkUsersData = action.payload.data;
      })
      .addCase(addBulkUsersThunk.rejected, (state, action) => {
        state.loading.addBulkUsersLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserThunk.pending, state => {
        state.loading.getUserDetailsLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading.getUserDetailsLoading = false;
        state.getUserDetails = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading.getUserDetailsLoading = false;
        state.error = action.payload;
      });
  },
});

export default userManagementSlice.reducer;
