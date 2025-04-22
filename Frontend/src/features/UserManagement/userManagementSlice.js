import { createSlice } from '@reduxjs/toolkit';
import { addStaffThunk } from './userManagementThunk';

const initialState = {
  addStaffData: null,
  error: null,
  loading: {
    addStaffLoading: false,
  },
};
const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState,
  extraReducers: builder => {
    builder
      // updateSystemId
      .addCase(addStaffThunk.pending, state => {
        state.loading.addStaffLoading = true;
        state.error = null;
      })
      .addCase(addStaffThunk.fulfilled, (state, action) => {
        state.loading.addStaffLoading = false;
        state.addStaffData = action.payload.data;
      })
      .addCase(addStaffThunk.rejected, (state, action) => {
        state.loading.addStaffLoading = false;
        state.error = action.payload;
      });
  },
});

export default userManagementSlice.reducer;
