import { createSlice } from '@reduxjs/toolkit';
import { addDepartmentThunk } from './hrmManagementThunk';

const initialState = {
  addDepartmentData: [],
  error: null,
  loading: {
    addDepartmentLoading: false,
  },
};
const hrmManagementSlice = createSlice({
  name: 'hrmManagement',
  initialState: initialState,
  extraReducers: builder => {
    builder      
      .addCase(addDepartmentThunk.pending, state => {
        state.loading.addDepartmentLoading = true;
        state.error = null;
      })
      .addCase(addDepartmentThunk.fulfilled, (state, action) => {
        state.loading.addDepartmentLoading = false;
        state.addDepartmentData = action.payload.data;
      })
      .addCase(addDepartmentThunk.rejected, (state, action) => {
        state.loading.addDepartmentLoading = false;
        state.error = action.payload;
      });
  },
});

export default hrmManagementSlice.reducer;
