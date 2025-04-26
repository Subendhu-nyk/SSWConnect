import { createSlice } from '@reduxjs/toolkit';
import { addUserThunk } from './userManagementThunk';

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
      });
  },
});

export default userManagementSlice.reducer;
