import { createSlice } from '@reduxjs/toolkit';
import { addDepartmentThunk, addDesignationThunk } from './hrmManagementThunk';

const initialState = {
  addDepartmentData: [],
  addDesignationData: [],
  error: null,
  loading: {
    addDepartmentLoading: false,
    addDesignationLoading: false,
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
      })
      .addCase(addDesignationThunk.pending, state => {
        state.loading.addDepartmentLoading = true;
        state.error = null;
      })
      .addCase(addDesignationThunk.fulfilled, (state, action) => {
        state.loading.addDepartmentLoading = false;
        state.addDepartmentData = action.payload.data;
      })
      .addCase(addDesignationThunk.rejected, (state, action) => {
        state.loading.addDepartmentLoading = false;
        state.error = action.payload;
      });
  },
});

export default hrmManagementSlice.reducer;
