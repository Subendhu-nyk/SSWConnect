import { createSlice } from '@reduxjs/toolkit';
import { addDepartmentThunk, addDesignationThunk, getDepartmentThunk } from './hrmManagementThunk';

const initialState = {
  addDepartmentData: [],
  getDepartmentData: [],
  addDesignationData: [],
  error: null,
  loading: {
    addDepartmentLoading: false,
    addDesignationLoading: false,
    getDepartmentLoading: false,
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
      .addCase(getDepartmentThunk.pending, state => {
         console.log("pending")
        state.loading.getDepartmentLoading = true;
        state.error = null;
      })
      .addCase(getDepartmentThunk.fulfilled, (state, action) => {
        console.log("fulfilled",action.payload.data)
        state.loading.getDepartmentLoading = false;
        state.getDepartmentData = action.payload.data;
      })
      .addCase(getDepartmentThunk.rejected, (state, action) => {
         console.log("rejected",action.payload.data)
        state.loading.getDepartmentLoading = false;
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
